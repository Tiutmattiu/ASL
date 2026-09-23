const SPREADSHEET_ID = "1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw";
const SHEET_NAME = "Sheet1";
const TIME_ZONE = "Asia/Hong_Kong";
const INCENTIVE_AMOUNT = 200;

const REQUIRED_HEADERS = [
  "Name","Phone","Status","PolyU MRI time","TMH suggested arrival",
  "Appointment order","PolyU scan completed","TMH scan completed",
  "Incentive site","Incentive paid","Campus QR","weight","height"
];

function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents || "{}");
    const handlers = { lookup: lookup_, updateProfile: updateProfile_ };
    if (!handlers[request.action]) fail_("BAD_REQUEST","Unknown action");
    return json_(Object.assign({ok:true}, handlers[request.action](request)));
  } catch (error) {
    return json_({ok:false,code:error.code || "SERVER_ERROR",message:error.message});
  }
}

function lookup_(request) {
  const participant = findParticipant_(request.phone);
  if (!participant) fail_("NOT_FOUND","Phone number not found");
  return { participant: publicParticipant_(participant) };
}

function updateProfile_(request) {
  const height = number_(request.height);
  const weight = number_(request.weight);
  if (!(height >= 100 && height <= 250)) fail_("BAD_HEIGHT","Invalid height");
  if (!(weight >= 20 && weight <= 300)) fail_("BAD_WEIGHT","Invalid weight");

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY","Sheet is busy; please try again");
  try {
    const participant = findParticipant_(request.phone);
    if (!participant) fail_("NOT_FOUND","Phone number not found");
    const ctx = sheetContext_();
    setByHeader_(ctx.sheet, participant.row, ctx.map, "height", height);
    setByHeader_(ctx.sheet, participant.row, ctx.map, "weight", weight);
    SpreadsheetApp.flush();
    return {height,weight};
  } finally {
    lock.releaseLock();
  }
}

function sheetContext_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) fail_("SHEET_NOT_FOUND",SHEET_NAME + " was not found");

  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1,1,1,lastColumn).getDisplayValues()[0];
  const map = {};
  headers.forEach((h,i) => {
    const key = String(h || "").trim();
    if (key) map[key] = i;
  });
  return {sheet,headers,map};
}

function findParticipant_(phone) {
  const wanted = normalizePhone_(phone);
  if (!wanted) return null;

  const ctx = sheetContext_();
  const lastRow = ctx.sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = ctx.sheet.getRange(2,1,lastRow-1,ctx.sheet.getLastColumn()).getDisplayValues();
  for (let i=0;i<values.length;i++) {
    const row = values[i];
    if (normalizePhone_(get_(row,ctx.map,"Phone")) !== wanted) continue;
    return participantFromRow_(i+2,row,ctx.map);
  }
  return null;
}

function participantFromRow_(rowNumber,row,map) {
  return {
    row: rowNumber,
    name: get_(row,map,"Name"),
    phone: get_(row,map,"Phone"),
    status: get_(row,map,"Status"),
    weight: get_(row,map,"weight"),
    height: get_(row,map,"height"),
    handedness: get_(row,map,"handedness"),
    sid: get_(row,map,"SID_Polyu"),
    nameTm: get_(row,map,"Name_TM"),
    patientIdTm: get_(row,map,"Patient_ID_TM"),
    polyuTime: get_(row,map,"PolyU MRI time"),
    tmhTime: get_(row,map,"TMH suggested arrival"),
    order: get_(row,map,"Appointment order"),
    qr: get_(row,map,"Campus QR"),
    polyuCompleted: yes_(get_(row,map,"PolyU scan completed")),
    tmhCompleted: yes_(get_(row,map,"TMH scan completed")),
    incentiveSite: get_(row,map,"Incentive site"),
    incentivePaid: yes_(get_(row,map,"Incentive paid"))
  };
}

function publicParticipant_(p) {
  return {
    name: p.name,
    status: p.status,
    height: p.height,
    weight: p.weight,
    appointment: p.polyuTime ? {
      polyuTime: p.polyuTime,
      tmhTime: p.tmhTime,
      order: p.order || inferOrder_(p.polyuTime,p.tmhTime),
      qr: p.qr,
      incentiveSite: p.incentiveSite,
      incentivePaid: p.incentivePaid,
      polyuCompleted: p.polyuCompleted,
      tmhCompleted: p.tmhCompleted
    } : null
  };
}

function inferOrder_(polyu,tmh) {
  const a = parseStart_(polyu), b = parseStart_(tmh);
  if (!a || !b) return "";
  return a.getTime() < b.getTime() ? "POLYU_FIRST" : "TMH_FIRST";
}

function get_(row,map,header) {
  const i = map[String(header).trim()];
  return i == null ? "" : row[i];
}

function setByHeader_(sheet,row,map,header,value) {
  const i = map[String(header).trim()];
  if (i == null) fail_("MISSING_HEADER","Missing column: " + header);
  sheet.getRange(row,i+1).setValue(value);
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
  return m ? Utilities.parseDate(
    [m[1],String(m[2]).padStart(2,"0"),String(m[3]).padStart(2,"0")].join("-") +
    " " + String(m[4]).padStart(2,"0") + ":" + m[5],
    TIME_ZONE,"yyyy-MM-dd HH:mm"
  ) : null;
}

function arrival30_(slot) {
  const d = parseStart_(slot);
  if (!d) return "";
  return Utilities.formatDate(new Date(d.getTime()-30*60*1000),TIME_ZONE,"yyyy-MM-dd HH:mm");
}

function yes_(value) {
  return ["YES","TRUE","1"].includes(String(value || "").trim().toUpperCase());
}

function number_(value) {
  const n = Number(String(value || "").trim());
  return Number.isFinite(n) ? n : NaN;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function fail_(code,message) {
  const e = new Error(message); e.code = code; throw e;
}

/* ---------- staff/admin helpers ---------- */

function markScanCompleted(phone,site) {
  const p = findParticipant_(phone);
  if (!p) fail_("NOT_FOUND","Phone number not found");
  const header = site === "POLYU" ? "PolyU scan completed" : site === "TMH" ? "TMH scan completed" : "";
  if (!header) fail_("BAD_SITE","Site must be POLYU or TMH");
  const ctx = sheetContext_();
  setByHeader_(ctx.sheet,p.row,ctx.map,header,true);
  return site + " scan marked completed";
}

function markIncentivePaid(phone) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY","Sheet is busy; please try again");
  try {
    const p = findParticipant_(phone);
    if (!p) fail_("NOT_FOUND","Phone number not found");
    if (!p.polyuCompleted || !p.tmhCompleted) fail_("SCANS_INCOMPLETE","Both scans must be completed before payment");
    const ctx = sheetContext_();
    setByHeader_(ctx.sheet,p.row,ctx.map,"Incentive paid",true);
    return "HK$" + INCENTIVE_AMOUNT + " marked paid";
  } finally {
    lock.releaseLock();
  }
}

function getReminderText(phone,language) {
  const p = findParticipant_(phone);
  if (!p || !p.polyuTime) fail_("NO_BOOKING","Appointment not found");
  const zh = language !== "en";
  return zh
    ? [
        p.name + "您好，提醒您已確認的掃描安排：",
        "香港理工大學掃描：" + p.polyuTime,
        "建議到達：" + arrival30_(p.polyuTime),
        "屯門醫院掃描：" + p.tmhTime,
        "建議到達：" + arrival30_(p.tmhTime),
        "掃描當天請勿吸煙、飲酒、飲用咖啡、茶、能量飲品或其他含咖啡因產品；掃描前至少2小時不要進食。",
        "到達後請電話或WhatsApp 91230084聯絡研究團隊。"
      ].join("\n")
    : [
        "Hello " + p.name + ", this is a reminder of your confirmed scan schedule:",
        "PolyU: " + p.polyuTime,
        "Recommended arrival: " + arrival30_(p.polyuTime),
        "Tuen Mun Hospital: " + p.tmhTime,
        "Recommended arrival: " + arrival30_(p.tmhTime),
        "On the scan day, do not smoke, drink alcohol, coffee, tea, energy drinks or other caffeinated products. Do not eat for at least 2 hours before scanning.",
        "When you arrive, call or WhatsApp 91230084."
      ].join("\n");
}

function sanityCheck() {
  const ctx = sheetContext_();
  const missing = REQUIRED_HEADERS.filter(h => ctx.map[String(h).trim()] == null);
  if (missing.length) throw new Error("Missing headers: " + missing.join(", "));
  return "PASS: header-based lookup/update ready; no fixed column positions";
}
