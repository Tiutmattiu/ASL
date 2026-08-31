const SPREADSHEET_ID = "1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw";
const SHEET_NAME = "Sheet1";
const TIME_ZONE = "Asia/Hong_Kong";

const POLYU_SLOTS = [
  "2026-09-13 14:00–14:30", "2026-09-13 14:30–15:00",
  "2026-10-04 09:00–09:30", "2026-10-04 09:30–10:00", "2026-10-04 10:00–10:30",
  "2026-10-04 10:30–11:00", "2026-10-04 11:00–11:30", "2026-10-04 11:30–12:00",
  "2026-10-04 12:00–12:30", "2026-10-04 12:30–13:00", "2026-10-04 13:00–13:30",
  "2026-10-04 14:30–15:00", "2026-10-04 16:00–16:30", "2026-10-04 16:30–17:00",
  "2026-10-04 17:00–17:30", "2026-10-04 17:30–18:00", "2026-10-04 18:00–18:30",
  "2026-10-10 09:00–09:30", "2026-10-10 09:30–10:00", "2026-10-10 11:30–12:00",
  "2026-10-10 12:00–12:30", "2026-10-10 12:30–13:00", "2026-10-10 13:00–13:30",
  "2026-10-10 14:30–15:00", "2026-10-10 16:30–17:00", "2026-10-10 17:00–17:30",
  "2026-10-10 17:30–18:00", "2026-10-10 18:00–18:30"
];

function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents || "{}");
    const handlers = { lookup: lookup_, book: book_, waitlist: waitlist_ };
    if (!handlers[request.action]) fail_("BAD_REQUEST", "Unknown action");
    return json_(Object.assign({ ok: true }, handlers[request.action](request)));
  } catch (error) {
    const body = { ok: false, code: error.code || "SERVER_ERROR", message: error.message };
    if (["SLOT_TAKEN", "SLOTS_AVAILABLE"].includes(error.code)) body.availableSlots = availableSlots_();
    return json_(body);
  }
}

function lookup_(request) {
  const participant = findParticipant_(request.phone);
  if (!participant) fail_("NOT_FOUND", "Phone number not found");
  return { participant: publicParticipant_(participant), availableSlots: availableSlots_() };
}

function book_(request) {
  if (!POLYU_SLOTS.includes(request.slot)) fail_("BAD_SLOT", "Invalid appointment slot");
  if (!["POLYU_FIRST", "TMH_FIRST"].includes(request.order)) fail_("BAD_ORDER", "Invalid appointment order");
  if (request.acknowledged !== true) fail_("NOT_ACKNOWLEDGED", "Instructions must be acknowledged");

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Booking is busy; please try again");
  try {
    const participant = findParticipant_(request.phone);
    if (!participant) fail_("NOT_FOUND", "Phone number not found");
    if (["S001", "S002"].includes(participant.sid)) fail_("ALREADY_ARRANGED", "Appointment already arranged");
    if (participant.polyuTime) return { appointment: appointment_(participant) };
    if (!availableSlots_().includes(request.slot)) fail_("SLOT_TAKEN", "Slot was just selected");

    const hospitalTime = suggestedHospitalTime_(request.slot, request.order);
    sheet_().getRange(participant.row, 6, 1, 6).setValues([[
      request.order, request.slot, hospitalTime, "YES", request.order, new Date()
    ]]);
    SpreadsheetApp.flush();
    return { appointment: { polyuTime: request.slot, tmhTime: hospitalTime, order: request.order, qr: participant.qr } };
  } finally {
    lock.releaseLock();
  }
}

function waitlist_(request) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Booking is busy; please try again");
  try {
    if (availableSlots_().length) fail_("SLOTS_AVAILABLE", "Appointment slots are available");
    const participant = findParticipant_(request.phone);
    if (!participant) fail_("NOT_FOUND", "Phone number not found");
    if (!participant.polyuTime) sheet_().getRange(participant.row, 6).setValue("WAITLIST");
    return { waitlisted: true };
  } finally {
    lock.releaseLock();
  }
}

function findParticipant_(phone) {
  const wanted = normalizePhone_(phone);
  if (!wanted) return null;
  const values = sheet_().getDataRange().getDisplayValues();
  for (let index = 1; index < values.length; index++) {
    if (normalizePhone_(values[index][0]) === wanted) {
      return {
        row: index + 1, name: values[index][1], sid: values[index][4], logistics: values[index][5],
        polyuTime: values[index][6], tmhTime: values[index][7], order: values[index][9] || values[index][5], qr: values[index][13]
      };
    }
  }
  return null;
}

function normalizePhone_(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (/^852\d{8}$/.test(digits)) return "+" + digits;
  if (/^86\d{11}$/.test(digits)) return "+" + digits;
  if (/^\d{8}$/.test(digits)) return "+852" + digits;
  return "";
}

function availableSlots_() {
  const lastRow = sheet_().getLastRow();
  const occupied = lastRow < 2 ? new Set() : new Set(sheet_().getRange(2, 7, lastRow - 1, 1).getDisplayValues().flat().map(String).map(value => value.trim()).filter(Boolean));
  return POLYU_SLOTS.filter(slot => !occupied.has(slot));
}

function suggestedHospitalTime_(slot, order) {
  const parts = slot.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})/);
  if (!parts) fail_("BAD_SLOT", "Invalid appointment slot");
  let minutes = Number(parts[2]) * 60 + Number(parts[3]) + (order === "POLYU_FIRST" ? 120 : -120);
  const start = String(Math.floor(minutes / 60)).padStart(2, "0") + ":" + String(minutes % 60).padStart(2, "0");
  minutes += 30;
  const end = String(Math.floor(minutes / 60)).padStart(2, "0") + ":" + String(minutes % 60).padStart(2, "0");
  return parts[1] + " " + start + "–" + end;
}

function publicParticipant_(participant) {
  return {
    name: participant.name,
    sid: participant.sid,
    appointment: participant.polyuTime ? appointment_(participant) : null
  };
}

function appointment_(participant) {
  return { polyuTime: participant.polyuTime, tmhTime: participant.tmhTime, order: participant.order, qr: participant.qr };
}

function sheet_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) fail_("SHEET_NOT_FOUND", "Sheet1 was not found");
  return sheet;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function fail_(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

// Run once before deployment. Formula-error phone cells must be corrected manually; the original digits cannot be recovered safely.
function setupBookingSheet() {
  const sheet = sheet_();
  sheet.getRange("A:A").setNumberFormat("@");
  sheet.getRange(1, 9, 1, 6).setValues([["Instructions acknowledged", "Appointment order", "Booking timestamp", "Reminder 24h", "Reminder 3h", "Campus QR"]]);
}

// Small manual check, intentionally not a test suite.
function sanityCheck() {
  if (POLYU_SLOTS.length !== 28 || new Set(POLYU_SLOTS).size !== 28) throw new Error("Expected 28 unique slots");
  if (suggestedHospitalTime_("2026-10-04 14:30–15:00", "TMH_FIRST") !== "2026-10-04 12:30–13:00") throw new Error("Hospital time check failed");
  return "28 unique slots; hospital time check passed";
}
