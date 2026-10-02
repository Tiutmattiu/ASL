const SPREADSHEET_ID = "1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw";
const SHEET_NAME = "Sheet1";
const TIME_ZONE = "Asia/Hong_Kong";
const INCENTIVE_AMOUNT = 200;

const REQUIRED_HEADERS = [
  "Name_TM",
  "Patient_ID_TM",
  "Name",
  "Gender",
  "Age",
  "weight",
  "height",
  "handedness",
  "Phone",
  "SID_Polyu",
  "Status",
  "PolyU MRI time",
  "TMH suggested arrival",
  "Appointment order",
  "Reminder 24h",
  "Reminder 3h",
  "PolyU scan completed",
  "TMH scan completed",
  "Incentive site",
  "Incentive paid",
  "Campus QR",
  "Booking timestamp",
  "Instructions acknowledged",
  "Standby preferences",
  "Standby timestamp",
  "Standby information acknowledged"
];

const REPLACEMENT_SLOTS = {
  B: {
    targetPatientId: "20261004013",
    originalPhone: "+85265677735",
    polyuTime: "2026-10-04 13:00–13:30",
    tmhTime: "2026-10-04 15:00–15:30",
    order: "POLYU_FIRST",
    incentiveSite: "TMH",
    qr: "https://drive.google.com/thumbnail?id=1Lid_keX_jGDryzDUmKMq2fw080LTRPzP&sz=w1000",
    label: "香港理工大學 13:00–13:30 → 屯門醫院 15:00–15:30"
  },
  D: {
    targetPatientId: "20261004010",
    originalPhone: "+85252641868",
    polyuTime: "2026-10-04 16:30–17:00",
    tmhTime: "2026-10-04 13:30–14:00",
    order: "TMH_FIRST",
    incentiveSite: "POLYU",
    qr: "https://drive.google.com/thumbnail?id=1PnPcDVYIQP_XFe8enpLHE9VVUjXLoZOX&sz=w1000",
    label: "屯門醫院 13:30–14:00 → 香港理工大學 16:30–17:00"
  }
};

function doPost(e) {
  try {
    const request = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const handlers = {
      lookup: lookup_,
      updateProfile: updateProfile_,
      bookReplacement: bookReplacement_
    };

    if (!handlers[request.action]) {
      fail_("BAD_REQUEST", "Unknown action");
    }

    return json_(Object.assign({ ok: true }, handlers[request.action](request)));
  } catch (error) {
    return json_({
      ok: false,
      code: error.code || "SERVER_ERROR",
      message: error.message || String(error)
    });
  }
}

function lookup_(request) {
  const participant = findParticipant_(request.phone);

  if (!participant) {
    fail_("NOT_FOUND", "Phone number not found");
  }

  return {
    participant: publicParticipant_(participant)
  };
}

function updateProfile_(request) {
  const height = number_(request.height);
  const weight = number_(request.weight);
  const handednessInput = String(request.handedness || "").trim().toUpperCase();

  if (!(height >= 100 && height <= 250)) {
    fail_("BAD_HEIGHT", "Invalid height");
  }

  if (!(weight >= 20 && weight <= 300)) {
    fail_("BAD_WEIGHT", "Invalid weight");
  }

  if (handednessInput && !["R", "L"].includes(handednessInput)) {
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

    if (handednessInput) {
      setByHeader_(ctx.sheet, participant.row, ctx.map, "handedness", handednessInput);
    }

    SpreadsheetApp.flush();

    return {
      height: height,
      weight: weight,
      handedness: handednessInput || participant.handedness
    };
  } finally {
    lock.releaseLock();
  }
}

function bookReplacement_(request) {
  const phone = normalizePhone_(request.phone);
  const slotId = String(request.slotId || "").trim();
  const slot = REPLACEMENT_SLOTS[slotId];

  if (!phone) {
    fail_("BAD_PHONE", "Valid phone number is required");
  }

  if (!slot) {
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
        booked: true,
        waitlisted: false,
        appointment: appointmentFromParticipant_(participant)
      };
    }

    if (!participant.height || !participant.weight || !["R", "L"].includes(participant.handedness)) {
      fail_("PROFILE_INCOMPLETE", "Height, weight and handedness are required before booking");
    }

    const target = findRowByHeaderValue_(ctx, "Patient_ID_TM", slot.targetPatientId);

    if (!target) {
      fail_("TARGET_NOT_FOUND", "Replacement row was not found");
    }

    const currentTarget = participantFromRow_(target.row, target.values, ctx.map);
    const currentTargetPhone = normalizePhone_(currentTarget.phone);

    const slotStillOpen =
      currentTargetPhone === slot.originalPhone ||
      currentTargetPhone === phone;

    if (!slotStillOpen) {
      setWaitlist_(ctx, participant.row, slotId, slot);
      SpreadsheetApp.flush();

      return {
        booked: false,
        waitlisted: true,
        slotId: slotId,
        preference: slotId + ": " + slot.label
      };
    }

    moveParticipantIntoReplacementRow_(ctx, participant, target.row, slot);
    SpreadsheetApp.flush();

    const bookedParticipant = findParticipantInContext_(sheetContext_(), phone);

    return {
      booked: true,
      waitlisted: false,
      appointment: appointmentFromParticipant_(bookedParticipant)
    };
  } finally {
    lock.releaseLock();
  }
}

function moveParticipantIntoReplacementRow_(ctx, participant, targetRow, slot) {
  const sourceRow = participant.row;

  const fieldsToMove = [
    "Name",
    "Gender",
    "Age",
    "weight",
    "height",
    "handedness",
    "Phone",
    "SID_Polyu"
  ];

  fieldsToMove.forEach(header => {
    setByHeader_(
      ctx.sheet,
      targetRow,
      ctx.map,
      header,
      get_(participant.raw, ctx.map, header)
    );
  });

  setByHeader_(ctx.sheet, targetRow, ctx.map, "Status", "BOOKED");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "PolyU MRI time", slot.polyuTime);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "TMH suggested arrival", slot.tmhTime);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Appointment order", slot.order);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Reminder 24h", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Reminder 3h", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "PolyU scan completed", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "TMH scan completed", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Incentive site", slot.incentiveSite);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Incentive paid", false);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Campus QR", slot.qr);
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Booking timestamp", new Date());
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Instructions acknowledged", "YES");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby preferences", "");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby timestamp", "");
  setByHeader_(ctx.sheet, targetRow, ctx.map, "Standby information acknowledged", "YES");

  if (sourceRow !== targetRow) {
    ctx.sheet
      .getRange(sourceRow, 1, 1, ctx.sheet.getLastColumn())
      .clearContent();
  }
}

function setWaitlist_(ctx, row, slotId, slot) {
  setByHeader_(ctx.sheet, row, ctx.map, "Status", "WAITLIST");
  setByHeader_(ctx.sheet, row, ctx.map, "Standby preferences", slotId + ": " + slot.label);
  setByHeader_(ctx.sheet, row, ctx.map, "Standby timestamp", new Date());
  setByHeader_(ctx.sheet, row, ctx.map, "Standby information acknowledged", "YES");
}

function sheetContext_() {
  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    fail_("SHEET_NOT_FOUND", SHEET_NAME + " was not found");
  }

  const lastColumn = sheet.getLastColumn();
  const headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0];

  const map = {};

  headers.forEach((header, index) => {
    const key = String(header || "").trim();

    if (key) {
      map[key] = index;
    }
  });

  return {
    sheet: sheet,
    headers: headers,
    map: map
  };
}

function findParticipant_(phone) {
  return findParticipantInContext_(sheetContext_(), normalizePhone_(phone));
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

  const values = ctx.sheet
    .getRange(2, 1, lastRow - 1, ctx.sheet.getLastColumn())
    .getDisplayValues();

  for (let i = 0; i < values.length; i++) {
    if (normalizePhone_(get_(values[i], ctx.map, "Phone")) !== wanted) {
      continue;
    }

    return participantFromRow_(i + 2, values[i], ctx.map);
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

  const values = ctx.sheet
    .getRange(2, 1, lastRow - 1, ctx.sheet.getLastColumn())
    .getDisplayValues();

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][index] || "").trim() === String(wantedValue).trim()) {
      return {
        row: i + 2,
        values: values[i]
      };
    }
  }

  return null;
}

function participantFromRow_(rowNumber, row, map) {
  return {
    row: rowNumber,
    raw: row,
    name: get_(row, map, "Name"),
    gender: get_(row, map, "Gender"),
    age: get_(row, map, "Age"),
    phone: get_(row, map, "Phone"),
    status: String(get_(row, map, "Status") || "").trim().toUpperCase(),
    height: get_(row, map, "height"),
    weight: get_(row, map, "weight"),
    handedness: String(get_(row, map, "handedness") || "").trim().toUpperCase(),
    polyuTime: get_(row, map, "PolyU MRI time"),
    tmhTime: get_(row, map, "TMH suggested arrival"),
    order: get_(row, map, "Appointment order"),
    qr: get_(row, map, "Campus QR"),
    polyuCompleted: yes_(get_(row, map, "PolyU scan completed")),
    tmhCompleted: yes_(get_(row, map, "TMH scan completed")),
    incentiveSite: get_(row, map, "Incentive site"),
    incentivePaid: yes_(get_(row, map, "Incentive paid")),
    waitlistPreference: get_(row, map, "Standby preferences")
  };
}

function appointmentFromParticipant_(participant) {
  return {
    polyuTime: participant.polyuTime,
    tmhTime: participant.tmhTime,
    order: participant.order || inferOrder_(participant.polyuTime, participant.tmhTime),
    qr: participant.qr,
    incentiveSite: participant.incentiveSite,
    incentivePaid: participant.incentivePaid,
    polyuCompleted: participant.polyuCompleted,
    tmhCompleted: participant.tmhCompleted
  };
}

function publicParticipant_(participant) {
  return {
    name: participant.name,
    gender: participant.gender,
    age: participant.age,
    phone: participant.phone,
    status: participant.status,
    height: participant.height,
    weight: participant.weight,
    handedness: participant.handedness,
    waitlistPreference: participant.waitlistPreference,
    appointment:
      participant.status === "BOOKED" && participant.polyuTime
        ? appointmentFromParticipant_(participant)
        : null
  };
}

function inferOrder_(polyu, tmh) {
  const polyuStart = parseStart_(polyu);
  const tmhStart = parseStart_(tmh);

  if (!polyuStart || !tmhStart) {
    return "";
  }

  return polyuStart.getTime() < tmhStart.getTime()
    ? "POLYU_FIRST"
    : "TMH_FIRST";
}

function get_(row, map, header) {
  const index = map[String(header).trim()];
  return index == null ? "" : row[index];
}

function setByHeader_(sheet, row, map, header, value) {
  const index = map[String(header).trim()];

  if (index == null) {
    fail_("MISSING_HEADER", "Missing column: " + header);
  }

  sheet.getRange(row, index + 1).setValue(value);
}

function normalizePhone_(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (/^852\d{8}$/.test(digits)) {
    return "+" + digits;
  }

  if (/^86\d{11}$/.test(digits)) {
    return "+" + digits;
  }

  if (/^\d{8}$/.test(digits)) {
    return "+852" + digits;
  }

  return "";
}

function parseStart_(slot) {
  const match = String(slot || "").match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/
  );

  if (!match) {
    return null;
  }

  return Utilities.parseDate(
    match[1] + "-" +
    String(match[2]).padStart(2, "0") + "-" +
    String(match[3]).padStart(2, "0") + " " +
    String(match[4]).padStart(2, "0") + ":" +
    match[5],
    TIME_ZONE,
    "yyyy-MM-dd HH:mm"
  );
}

function arrival30_(slot) {
  const start = parseStart_(slot);

  if (!start) {
    return "";
  }

  return Utilities.formatDate(
    new Date(start.getTime() - 30 * 60 * 1000),
    TIME_ZONE,
    "yyyy-MM-dd HH:mm"
  );
}

function yes_(value) {
  return ["YES", "TRUE", "1"].includes(
    String(value || "").trim().toUpperCase()
  );
}

function number_(value) {
  const number = Number(String(value || "").trim());
  return Number.isFinite(number) ? number : NaN;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function fail_(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function markScanCompleted(phone, site) {
  const participant = findParticipant_(phone);

  if (!participant) {
    fail_("NOT_FOUND", "Phone number not found");
  }

  const header =
    site === "POLYU"
      ? "PolyU scan completed"
      : site === "TMH"
        ? "TMH scan completed"
        : "";

  if (!header) {
    fail_("BAD_SITE", "Site must be POLYU or TMH");
  }

  const ctx = sheetContext_();
  setByHeader_(ctx.sheet, participant.row, ctx.map, header, true);

  return site + " scan marked completed";
}

function markIncentivePaid(phone) {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    fail_("BUSY", "Sheet is busy; please try again");
  }

  try {
    const participant = findParticipant_(phone);

    if (!participant) {
      fail_("NOT_FOUND", "Phone number not found");
    }

    if (!participant.polyuCompleted || !participant.tmhCompleted) {
      fail_("SCANS_INCOMPLETE", "Both scans must be completed before payment");
    }

    const ctx = sheetContext_();
    setByHeader_(ctx.sheet, participant.row, ctx.map, "Incentive paid", true);

    return "HK$" + INCENTIVE_AMOUNT + " marked paid";
  } finally {
    lock.releaseLock();
  }
}

function getReminderText(phone, language) {
  const participant = findParticipant_(phone);

  if (
    !participant ||
    participant.status !== "BOOKED" ||
    !participant.polyuTime
  ) {
    fail_("NO_BOOKING", "Appointment not found");
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
  const missing = REQUIRED_HEADERS.filter(
    header => ctx.map[String(header).trim()] == null
  );

  if (missing.length) {
    throw new Error("Missing headers: " + missing.join(", "));
  }

  return "PASS: replacement booking backend ready";
}
