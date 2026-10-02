const SPREADSHEET_ID = "1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw";
const SHEET_NAME = "Sheet1";
const TIME_ZONE = "Asia/Hong_Kong";
const INCENTIVE_AMOUNT = 200;

const REQUIRED_HEADERS = [
  "Name_TM","Patient_ID_TM","Name","Gender","Age","weight","height","handedness",
  "Phone","SID_Polyu","Status","PolyU MRI time","TMH suggested arrival",
  "Appointment order","Reminder 24h","Reminder 3h","PolyU scan completed",
  "TMH scan completed","Incentive site","Incentive paid","Campus QR",
  "Booking timestamp","Instructions acknowledged","Standby preferences",
  "Standby timestamp","Standby information acknowledged"
];

const REPLACEMENT_SLOT = {
  id: "B",
  targetPatientId: "20261004013",
  polyuTime: "2026-10-04 13:00–13:30",
  tmhTime: "2026-10-04 15:00–15:30",
  order: "POLYU_FIRST",
  incentiveSite: "TMH",
  qr: "https://drive.google.com/thumbnail?id=1Lid_keX_jGDryzDUmKMq2fw080LTRPzP&sz=w1000",
  label: "香港理工大學 13:00–13:30 → 屯門醫院 15:00–15:30"
};

function doPost(e) {
  try {
    const request = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const handlers = {
      lookup: lookup_,
      updateProfile: updateProfile_,
      bookReplacement: bookReplacement_,
      recordPreference: recordPreference_
    };

    if (!handlers[request.action]) {
      fail_("BAD_REQUEST", "Unknown action");
    }

    return json_(Object.assign({ok:true}, handlers[request.action](request)));
  } catch (error) {
    return json_({
      ok:false,
      code:error.code || "SERVER_ERROR",
      message:error.message || String(error)
    });
  }
}

function lookup_(request) {
  const ctx = sheetContext_();
  const participant = findParticipantInContext_(ctx, request.phone);

  if (!participant) {
    fail_("NOT_FOUND", "Phone number not found");
  }

  return {
    participant: publicParticipant_(participant),
    october4Open: isReplacementSlotOpen_(ctx)
  };
}

function updateProfile_(request) {
  const height = number_(request.height);
  const weight = number_(request.weight);
  const handedness = String(request.handedness || "").trim().toUpperCase();

  if (!(height >= 100 && height <= 250)) {
    fail_("BAD_HEIGHT", "Invalid height");
  }

  if (!(weight >= 20 && weight <= 300)) {
    fail_("BAD_WEIGHT", "Invalid weight");
  }

  if (!["R","L"].includes(handedness)) {
    fail_("BAD_HANDEDNESS", "Handedness must be R or L");
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    fail_("BUSY", "Sheet is busy; please try again");
  }

  try {
    const participant = findParticipant_(request.phone);

    if (!participant) {
      fail_("NOT_FOUND", "Phone number not found");
    }

    const ctx = sheetContext_();
    setByHeader_(ctx.sheet, participant.row, ctx.map, "height", height);
    setByHeader_(ctx.sheet, participant.row, ctx.map, "weight", weight);
    setByHeader_(ctx.sheet, participant.row, ctx.map, "handedness", handedness);
    SpreadsheetApp.flush();

    return {height:height, weight:weight, handedness:handedness};
  } finally {
    lock.releaseLock();
  }
}

function recordPreference_(request) {
  const preference = String(request.preference || "").trim().toUpperCase();

  if (!["OCT10","NONE"].includes(preference)) {
    fail_("BAD_PREFERENCE", "Invalid preference");
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    fail_("BUSY", "Sheet is busy; please try again");
  }

  try {
    const ctx = sheetContext_();
    const participant = findParticipantInContext_(ctx, request.phone);

    if (!participant) {
      fail_("NOT_FOUND", "Phone number not found");
    }

    if (participant.status === "COMPLETED") {
      fail_("COMPLETED", "Participant already completed the study");
    }

    if (participant.status === "BOOKED" && participant.polyuTime) {
      return {
        booked:true,
        appointment:appointmentFromParticipant_(participant)
      };
    }

    if (preference === "OCT10") {
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Status", "WAITLIST");
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby preferences", "OCT10: 2026-10-10");
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby timestamp", new Date());
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby information acknowledged", "YES");
      SpreadsheetApp.flush();

      return {
        booked:false,
        waitlisted:true,
        preference:"OCT10: 2026-10-10"
      };
    }

    setByHeader_(ctx.sheet, participant.row, ctx.map, "Status", "");
    setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby preferences", "NONE: current dates unavailable");
    setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby timestamp", new Date());
    setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby information acknowledged", "YES");
    SpreadsheetApp.flush();

    return {
      booked:false,
      waitlisted:false,
      unavailable:true,
      preference:"NONE: current dates unavailable"
    };
  } finally {
    lock.releaseLock();
  }
}

function bookReplacement_(request) {
  const phone = normalizePhone_(request.phone);

  if (!phone) {
    fail_("BAD_PHONE", "Valid phone number is required");
  }

  if (String(request.slotId || "").trim() !== REPLACEMENT_SLOT.id) {
    fail_("BAD_SLOT", "Invalid slot");
  }

  if (request.acknowledged !== true) {
    fail_("NOT_ACKNOWLEDGED", "Instructions must be acknowledged");
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    fail_("BUSY", "Sheet is busy; please try again");
  }

  try {
    const ctx = sheetContext_();
    const participant = findParticipantInContext_(ctx, phone);

    if (!participant) {
      fail_("NOT_FOUND", "Phone number not found");
    }

    if (participant.status === "COMPLETED") {
      fail_("COMPLETED", "Participant already completed the study");
    }

    if (participant.status === "BOOKED" && participant.polyuTime) {
      return {
        booked:true,
        waitlisted:false,
        appointment:appointmentFromParticipant_(participant)
      };
    }

    if (!participant.height || !participant.weight || !["R","L"].includes(participant.handedness)) {
      fail_("PROFILE_INCOMPLETE", "Height, weight and handedness are required before booking");
    }

    const target = replacementTargetRow_(ctx);

    if (!target) {
      fail_("TARGET_NOT_FOUND", "Replacement row was not found");
    }

    const targetName = String(get_(target.values, ctx.map, "Name") || "").trim();

    if (targetName) {
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Status", "WAITLIST");
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby preferences", "B: " + REPLACEMENT_SLOT.label);
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby timestamp", new Date());
      setByHeader_(ctx.sheet, participant.row, ctx.map, "Standby information acknowledged", "YES");
      SpreadsheetApp.flush();

      return {
        booked:false,
        waitlisted:true,
        preference:"B: " + REPLACEMENT_SLOT.label
      };
    }

    moveParticipantIntoReplacementRow_(ctx, participant, target.row);
    SpreadsheetApp.flush();

    const bookedParticipant = findParticipantInContext_(sheetContext_(), phone);

    return {
      booked:true,
      waitlisted:false,
      appointment:appointmentFromParticipant_(bookedParticipant)
    };
  } finally {
    lock.releaseLock();
  }
}

function isReplacementSlotOpen_(ctx) {
  const target = replacementTargetRow_(ctx);
  if (!target) {
    return false;
  }
  return !String(get_(target.values, ctx.map, "Name") || "").trim();
}

function replacementTargetRow_(ctx) {
  return findRowByHeaderValue_(ctx, "Patient_ID_TM", REPLACEMENT_SLOT.targetPatientId);
}

function moveParticipantIntoReplacementRow_(ctx, participant, targetRow) {
  const sourceRow = participant.row;
  const fields = ["Name","Gender","Age","weight","height","handedness","Phone","SID_Polyu"];

  fields.forEach(function(header) {
    setByHeader_(
      ctx.sheet,
      targetRow,
      ctx.map,
      header,
      get_(participant.raw, ctx.map, header)
    );
  });

  setByHeader_(ctx.sheet, targetRow, ctx.map, "Status", "BOOKED");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "PolyU MRI time", REPLACEMENT_SLOT.polyuTime);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "TMH suggested arrival", REPLACEMENT_SLOT.tmhTime);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Appointment order", REPLACEMENT_SLOT.order);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Reminder 24h", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Reminder 3h", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "PolyU scan completed", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "TMH scan completed", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Incentive site", REPLACEMENT_SLOT.incentiveSite);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Incentive paid", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Campus QR", REPLACEMENT_SLOT.qr);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Booking timestamp", new Date());
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Instructions acknowledged", "YES");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby preferences", "");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby timestamp", "");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby information acknowledged", "YES");

  if (sourceRow !== targetRow) {
    ctx.sheet.getRange(sourceRow, 1, 1, ctx.sheet.getLastColumn()).clearContent();
  }
}

function sheetContext_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    fail_("SHEET_NOT_FOUND", SHEET_NAME + " was not found");
  }

  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1,1,1,lastColumn).getDisplayValues()[0];
  const map = {};

  headers.forEach(function(header,index) {
    const key = String(header || "").trim();
    if (key) {
      map[key] = index;
    }
  });

  return {sheet:sheet, headers:headers, map:map};
}

function findParticipant_(phone) {
  return findParticipantInContext_(sheetContext_(), phone);
}

function findParticipantInContext_(ctx, phone) {
  const wanted = normalizePhone_(phone);

  if (!wanted) {
    return null;
  }

  const lastRow = ctx.sheet.getLastRow();

  if (lastRow < 2) {
    return null;
  }

  const values = ctx.sheet.getRange(2,1,lastRow-1,ctx.sheet.getLastColumn()).getDisplayValues();

  for (let i=0; i<values.length; i++) {
    if (normalizePhone_(get_(values[i],ctx.map,"Phone")) === wanted) {
      return participantFromRow_(i+2, values[i], ctx.map);
    }
  }

  return null;
}

function findRowByHeaderValue_(ctx, header, wantedValue) {
  const index = ctx.map[String(header).trim()];

  if (index == null) {
    fail_("MISSING_HEADER", "Missing column: " + header);
  }

  const lastRow = ctx.sheet.getLastRow();

  if (lastRow < 2) {
    return null;
  }

  const values = ctx.sheet.getRange(2,1,lastRow-1,ctx.sheet.getLastColumn()).getDisplayValues();

  for (let i=0; i<values.length; i++) {
    if (String(values[i][index] || "").trim() === String(wantedValue).trim()) {
      return {row:i+2, values:values[i]};
    }
  }

  return null;
}

function participantFromRow_(rowNumber,row,map) {
  return {
    row:rowNumber,
    raw:row,
    name:get_(row,map,"Name"),
    gender:get_(row,map,"Gender"),
    age:get_(row,map,"Age"),
    phone:get_(row,map,"Phone"),
    status:String(get_(row,map,"Status") || "").trim().toUpperCase(),
    height:get_(row,map,"height"),
    weight:get_(row,map,"weight"),
    handedness:String(get_(row,map,"handedness") || "").trim().toUpperCase(),
    polyuTime:get_(row,map,"PolyU MRI time"),
    tmhTime:get_(row,map,"TMH suggested arrival"),
    order:get_(row,map,"Appointment order"),
    qr:get_(row,map,"Campus QR"),
    polyuCompleted:yes_(get_(row,map,"PolyU scan completed")),
    tmhCompleted:yes_(get_(row,map,"TMH scan completed")),
    incentiveSite:get_(row,map,"Incentive site"),
    incentivePaid:yes_(get_(row,map,"Incentive paid")),
    waitlistPreference:get_(row,map,"Standby preferences")
  };
}

function appointmentFromParticipant_(participant) {
  return {
    polyuTime:participant.polyuTime,
    tmhTime:participant.tmhTime,
    order:participant.order || inferOrder_(participant.polyuTime,participant.tmhTime),
    qr:participant.qr,
    incentiveSite:participant.incentiveSite,
    incentivePaid:participant.incentivePaid,
    polyuCompleted:participant.polyuCompleted,
    tmhCompleted:participant.tmhCompleted
  };
}

function publicParticipant_(participant) {
  return {
    name:participant.name,
    gender:participant.gender,
    age:participant.age,
    phone:participant.phone,
    status:participant.status,
    height:participant.height,
    weight:participant.weight,
    handedness:participant.handedness,
    waitlistPreference:participant.waitlistPreference,
    appointment:
      participant.status === "BOOKED" && participant.polyuTime
        ? appointmentFromParticipant_(participant)
        : null
  };
}

function inferOrder_(polyu,tmh) {
  const a = parseStart_(polyu);
  const b = parseStart_(tmh);

  if (!a || !b) {
    return "";
  }

  return a.getTime() < b.getTime() ? "POLYU_FIRST" : "TMH_FIRST";
}

function get_(row,map,header) {
  const index = map[String(header).trim()];
  return index == null ? "" : row[index];
}

function setByHeader_(sheet,row,map,header,value) {
  const index = map[String(header).trim()];

  if (index == null) {
    fail_("MISSING_HEADER", "Missing column: " + header);
  }

  sheet.getRange(row,index+1).setValue(value);
}

function normalizePhone_(phone) {
  const digits = String(phone || "").replace(/\D/g,"");

  if (/^852\d{8}$/.test(digits)) return "+" + digits;
  if (/^86\d{11}$/.test(digits)) return "+" + digits;
  if (/^\d{8}$/.test(digits)) return "+852" + digits;

  return "";
}

function parseStart_(slot) {
  const m = String(slot || "").match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/);

  if (!m) {
    return null;
  }

  return Utilities.parseDate(
    m[1] + "-" +
    String(m[2]).padStart(2,"0") + "-" +
    String(m[3]).padStart(2,"0") + " " +
    String(m[4]).padStart(2,"0") + ":" + m[5],
    TIME_ZONE,
    "yyyy-MM-dd HH:mm"
  );
}

function arrival30_(slot) {
  const d = parseStart_(slot);

  if (!d) {
    return "";
  }

  return Utilities.formatDate(
    new Date(d.getTime()-30*60*1000),
    TIME_ZONE,
    "yyyy-MM-dd HH:mm"
  );
}

function yes_(value) {
  return ["YES","TRUE","1"].includes(String(value || "").trim().toUpperCase());
}

function number_(value) {
  const n = Number(String(value || "").trim());
  return Number.isFinite(n) ? n : NaN;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function fail_(code,message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function markScanCompleted(phone,site) {
  const participant = findParticipant_(phone);

  if (!participant) {
    fail_("NOT_FOUND","Phone number not found");
  }

  const header =
    site === "POLYU"
      ? "PolyU scan completed"
      : site === "TMH"
        ? "TMH scan completed"
        : "";

  if (!header) {
    fail_("BAD_SITE","Site must be POLYU or TMH");
  }

  const ctx = sheetContext_();
  setByHeader_(ctx.sheet,participant.row,ctx.map,header,true);

  return site + " scan marked completed";
}

function markIncentivePaid(phone) {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    fail_("BUSY","Sheet is busy; please try again");
  }

  try {
    const participant = findParticipant_(phone);

    if (!participant) {
      fail_("NOT_FOUND","Phone number not found");
    }

    if (!participant.polyuCompleted || !participant.tmhCompleted) {
      fail_("SCANS_INCOMPLETE","Both scans must be completed before payment");
    }

    const ctx = sheetContext_();
    setByHeader_(ctx.sheet,participant.row,ctx.map,"Incentive paid",true);

    return "HK$" + INCENTIVE_AMOUNT + " marked paid";
  } finally {
    lock.releaseLock();
  }
}

function getReminderText(phone,language) {
  const participant = findParticipant_(phone);

  if (!participant || participant.status !== "BOOKED" || !participant.polyuTime) {
    fail_("NO_BOOKING","Appointment not found");
  }

  const zh = language !== "en";

  return zh
    ? [
        participant.name + "您好，提醒您已確認的掃描安排：",
        "香港理工大學掃描：" + participant.polyuTime,
        "建議到達：" + arrival30_(participant.polyuTime),
        "屯門醫院掃描：" + participant.tmhTime,
        "建議到達：" + arrival30_(participant.tmhTime),
        "掃描當天請勿吸煙、飲酒、飲用咖啡、茶、能量飲品或其他含咖啡因產品；掃描前至少2小時不要進食。",
        "到達後請電話或WhatsApp 91230084聯絡研究團隊。"
      ].join("\n")
    : [
        "Hello " + participant.name + ", this is a reminder of your confirmed scan schedule:",
        "PolyU: " + participant.polyuTime,
        "Recommended arrival: " + arrival30_(participant.polyuTime),
        "Tuen Mun Hospital: " + participant.tmhTime,
        "Recommended arrival: " + arrival30_(participant.tmhTime),
        "On the scan day, do not smoke, drink alcohol, coffee, tea, energy drinks or other caffeinated products. Do not eat for at least 2 hours before scanning.",
        "When you arrive, call or WhatsApp 91230084."
      ].join("\n");
}

function sanityCheck() {
  const ctx = sheetContext_();
  const missing = REQUIRED_HEADERS.filter(function(header) {
    return ctx.map[String(header).trim()] == null;
  });

  if (missing.length) {
    throw new Error("Missing headers: " + missing.join(", "));
  }

  return "PASS: one Oct 4 slot only; availability is blank Name";
}
