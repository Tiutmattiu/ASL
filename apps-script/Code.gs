const SPREADSHEET_ID = "1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw";
const SHEET_NAME = "Sheet1";
const TIME_ZONE = "Asia/Hong_Kong";
const INCENTIVE_AMOUNT = 200;

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
    const handlers = { lookup: lookup_, book: book_, reschedule: reschedule_, waitlist: waitlist_ };
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
  return { participant: publicParticipant_(participant), availableSlots: availableSlots_(participant.polyuTime) };
}

function book_(request) {
  validateBookingRequest_(request);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Booking is busy; please try again");
  try {
    const participant = findParticipant_(request.phone);
    if (!participant) fail_("NOT_FOUND", "Phone number not found");
    if (["S001", "S002"].includes(participant.sid)) fail_("ALREADY_ARRANGED", "Appointment already arranged");
    if (participant.polyuTime) return { appointment: appointment_(participant) };
    if (!availableSlots_().includes(request.slot)) fail_("SLOT_TAKEN", "Slot was just selected");
    writeBooking_(participant.row, request.slot, request.order);
    return { appointment: appointment_(findParticipant_(request.phone)) };
  } finally {
    lock.releaseLock();
  }
}

function reschedule_(request) {
  validateBookingRequest_(request);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Booking is busy; please try again");
  try {
    const participant = findParticipant_(request.phone);
    if (!participant || !participant.polyuTime) fail_("NO_BOOKING", "No appointment to change");
    if (participant.incentivePaid || participant.polyuCompleted || participant.tmhCompleted) fail_("BOOKING_COMPLETED", "Completed appointments cannot be changed");
    if (!canReschedule_(participant)) fail_("RESCHEDULE_TOO_LATE", "Appointment is less than 24 hours away");
    if (request.slot !== participant.polyuTime && !availableSlots_().includes(request.slot)) fail_("SLOT_TAKEN", "Slot was just selected");
    writeBooking_(participant.row, request.slot, request.order);
    return { appointment: appointment_(findParticipant_(request.phone)) };
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

function validateBookingRequest_(request) {
  if (!POLYU_SLOTS.includes(request.slot)) fail_("BAD_SLOT", "Invalid appointment slot");
  if (!["POLYU_FIRST", "TMH_FIRST"].includes(request.order)) fail_("BAD_ORDER", "Invalid appointment order");
  if (request.acknowledged !== true) fail_("NOT_ACKNOWLEDGED", "Instructions must be acknowledged");
}

function writeBooking_(row, slot, order) {
  const hospitalTime = suggestedHospitalTime_(slot, order);
  const sheet = sheet_();
  sheet.getRange(row, 6, 1, 6).setValues([[order, slot, hospitalTime, "YES", order, new Date()]]);
  sheet.getRange(row, 17).setValue(incentiveSite_(order));
  SpreadsheetApp.flush();
}

function findParticipant_(phone) {
  const wanted = normalizePhone_(phone);
  if (!wanted) return null;
  const values = sheet_().getDataRange().getDisplayValues();
  for (let index = 1; index < values.length; index++) {
    if (normalizePhone_(values[index][0]) === wanted) {
      return {
        row: index + 1, phone: values[index][0], name: values[index][1], sid: values[index][4], logistics: values[index][5],
        polyuTime: values[index][6], tmhTime: values[index][7], order: values[index][9] || values[index][5], qr: values[index][13],
        polyuCompleted: values[index][14] === "YES", tmhCompleted: values[index][15] === "YES", incentiveSite: values[index][16],
        incentivePaid: values[index][17] === "YES", incentivePaidAt: values[index][18]
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

function availableSlots_(includeSlot) {
  const lastRow = sheet_().getLastRow();
  const occupied = lastRow < 2 ? new Set() : new Set(sheet_().getRange(2, 7, lastRow - 1, 1).getDisplayValues().flat().map(String).map(value => value.trim()).filter(Boolean));
  if (includeSlot) occupied.delete(includeSlot);
  return POLYU_SLOTS.filter(slot => !occupied.has(slot));
}

function suggestedHospitalTime_(slot, order) {
  const parts = slot.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})/);
  if (!parts) fail_("BAD_SLOT", "Invalid appointment slot");
  let minutes = Number(parts[2]) * 60 + Number(parts[3]) + (order === "POLYU_FIRST" ? 120 : -120);
  if (order === "TMH_FIRST") minutes = Math.max(minutes, 450);
  const format = value => String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0");
  return parts[1] + " " + format(minutes) + "–" + format(minutes + 30);
}

function incentiveSite_(order) {
  return order === "POLYU_FIRST" ? "TMH" : "POLYU";
}

function parseSlotDate_(slot) {
  const match = String(slot).match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})/);
  return match ? Utilities.parseDate(match[1] + " " + match[2], TIME_ZONE, "yyyy-MM-dd HH:mm") : null;
}

function canReschedule_(participant) {
  const appointment = parseSlotDate_(participant.polyuTime);
  return Boolean(appointment && !participant.incentivePaid && !participant.polyuCompleted && !participant.tmhCompleted && appointment.getTime() - Date.now() >= 24 * 60 * 60 * 1000);
}

function publicParticipant_(participant) {
  return { name: participant.name, sid: participant.sid, appointment: participant.polyuTime ? appointment_(participant) : null };
}

function appointment_(participant) {
  return {
    polyuTime: participant.polyuTime, tmhTime: participant.tmhTime, order: participant.order, qr: participant.qr,
    incentiveSite: participant.incentiveSite || incentiveSite_(participant.order), incentivePaid: participant.incentivePaid,
    polyuCompleted: participant.polyuCompleted, tmhCompleted: participant.tmhCompleted, canReschedule: canReschedule_(participant)
  };
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
  const error = new Error(message); error.code = code; throw error;
}

function setupBookingSheet() {
  const sheet = sheet_();
  sheet.getRange("A:A").setNumberFormat("@");
  const headers = ["Instructions acknowledged", "Appointment order", "Booking timestamp", "Reminder 24h", "Reminder 3h", "Campus QR", "PolyU scan completed", "TMH scan completed", "Incentive site", "Incentive paid", "Incentive paid at", "Incentive notes"];
  const range = sheet.getRange(1, 9, 1, headers.length);
  const current = range.getDisplayValues()[0];
  range.setValues([headers.map((header, index) => current[index] || header)]);
}

function addTestParticipant() {
  if (findParticipant_("00000000")) return "Test participant already exists";
  const sheet = sheet_();
  const row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setNumberFormat("@");
  sheet.getRange(row, 1, 1, 3).setValues([["00000000", "test", "F"]]);
  return "Test participant added at row " + row;
}

function resetTestParticipant() {
  const participant = findParticipant_("00000000");
  if (!participant) return "Test participant not found";
  sheet_().getRange(participant.row, 6, 1, 15).clearContent();
  return "Test participant booking fields F:T cleared";
}

function markScanCompleted(phone, site) {
  const participant = findParticipant_(phone);
  if (!participant) fail_("NOT_FOUND", "Phone number not found");
  const column = site === "POLYU" ? 15 : site === "TMH" ? 16 : 0;
  if (!column) fail_("BAD_SITE", "Site must be POLYU or TMH");
  sheet_().getRange(participant.row, column).setValue("YES");
  return site + " scan marked completed";
}

function markIncentivePaid(phone) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Sheet is busy; please try again");
  try {
    const participant = findParticipant_(phone);
    if (!participant) fail_("NOT_FOUND", "Phone number not found");
    if (!participant.polyuCompleted || !participant.tmhCompleted) fail_("SCANS_INCOMPLETE", "Both scans must be completed before payment");
    if (participant.incentivePaid) return "HK$" + INCENTIVE_AMOUNT + " already marked paid";
    const sheet = sheet_();
    sheet.getRange(participant.row, 17).setValue(participant.incentiveSite || incentiveSite_(participant.order));
    sheet.getRange(participant.row, 18, 1, 2).setValues([["YES", new Date()]]);
    return "HK$" + INCENTIVE_AMOUNT + " marked paid once";
  } finally {
    lock.releaseLock();
  }
}

function markTestPolyUCompleted() { return markScanCompleted("00000000", "POLYU"); }
function markTestTMHCompleted() { return markScanCompleted("00000000", "TMH"); }
function markTestIncentivePaid() { return markIncentivePaid("00000000"); }

function getReminderText(phone, hours, language) {
  const participant = findParticipant_(phone);
  if (!participant || !participant.polyuTime) fail_("NO_BOOKING", "Appointment not found");
  const zh = language !== "en";
  const heading = hours === 3 ? (zh ? "三小時掃描提醒" : "3-hour scan reminder") : (zh ? "明天掃描提醒" : "Tomorrow's scan reminder");
  const order = participant.order === "POLYU_FIRST" ? (zh ? "香港理工大學 → 屯門醫院" : "PolyU → Tuen Mun Hospital") : (zh ? "屯門醫院 → 香港理工大學" : "Tuen Mun Hospital → PolyU");
  const prep = zh ? "掃描前至少2小時不要進食；今天不要吸煙、飲酒或攝取咖啡因；前一晚不要熬夜；必要藥物按醫囑服用。PolyU請勿提前超過15分鐘到達。" : "Do not eat for at least 2 hours; do not smoke, drink alcohol or consume caffeine today; get sufficient sleep; take necessary medication as directed. Do not arrive at PolyU more than 15 minutes early.";
  return [heading, participant.name, "Order: " + order, "PolyU fixed: " + participant.polyuTime, "TMH suggested only: " + participant.tmhTime, prep].join("\n");
}

function sanityCheck() {
  if (POLYU_SLOTS.length !== 28 || new Set(POLYU_SLOTS).size !== 28) throw new Error("Expected 28 unique slots");
  if (suggestedHospitalTime_("2026-10-04 09:00–09:30", "TMH_FIRST") !== "2026-10-04 07:30–08:00") throw new Error("Early hospital clamp failed");
  if (incentiveSite_("POLYU_FIRST") !== "TMH" || incentiveSite_("TMH_FIRST") !== "POLYU") throw new Error("Incentive site check failed");
  return "28 unique slots; timing and single HK$200 incentive site checks passed";
}
