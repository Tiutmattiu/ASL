const FILES = {
  info: "assets/participant-information-sheet.pdf",
  consent: "assets/consent-form.pdf",
  polyuGuide: "assets/polyu-to-ubsn.pdf",
  tmhGuide: "assets/polyu-to-tmh.pdf"
};

const T = {
  zh: {
    title: "ASL 研究參加者頁面",
    footer: "不同場強下動脈自旋標記成像一致性研究",
    phoneTitle: "查看我的掃描安排",
    phoneHelp: "請輸入研究登記時提供的電話號碼。",
    phone: "電話號碼",
    continue: "查看安排",
    finding: "正在查找…",
    notFound: "找不到這個電話號碼，請檢查後再試。",
    error: "暫時無法連接系統，請稍後再試。",
    hello: "你好",
    schedule: "已確認掃描安排",
    scanTime: "掃描時間",
    arrive: "建議到達",
    arriveNote: "建議提前約 30 分鐘到達。",
    polyu: "香港理工大學 UBSN",
    tmh: "屯門醫院",
    order: "掃描順序",
    polyuFirst: "香港理工大學 → 屯門醫院",
    tmhFirst: "屯門醫院 → 香港理工大學",
    contact: "到達後請直接致電或 WhatsApp 91230084 聯絡研究團隊。",
    polyuSignal: "ZB217 位於 LG2，手機訊號可能較弱；建議乘升降機到 LG2 前先聯絡我們。",
    tmhMeet: "到達屯門醫院後，請到主座地下放射科（X光部門）門口等候，工作人員會前往接你。",
    preparation: "掃描前準備",
    prepItems: [
      "掃描前至少 2 小時不要進食。",
      "掃描當天不要吸煙、飲酒、飲用咖啡、茶、能量飲品或其他含咖啡因產品。",
      "前一晚不要熬夜，保持充足睡眠。",
      "掃描前避免劇烈運動及強烈情緒激動。",
      "必要藥物請按醫生指示正常服用，不要自行停藥；並告知研究團隊藥物名稱及劑量。"
    ],
    guides: "路線指引",
    polyuGuide: "前往 PolyU UBSN / ZB217",
    tmhGuide: "PolyU → 屯門醫院",
    openPdf: "查看 / 下載 PDF",
    extra: "補充資料",
    extraHelp: "屯門醫院登記需要身高及體重。請確認或補充以下資料。",
    height: "身高（cm）",
    weight: "體重（kg）",
    save: "儲存資料",
    saving: "儲存中…",
    saved: "資料已儲存 ✓",
    docs: "研究文件及同意書",
    infoText: "請先閱讀參加者須知，內容包括研究目的、程序、可能風險、保密及意外發現安排。",
    readAck: "我已閱讀參加者須知",
    consentText: "閱讀後請下載同意書，在「意外發現」部分選擇希望或不希望收到主要研究者通知，並填寫姓名、簽署及日期。",
    returnText: "完成後請將清晰照片或 PDF 透過 WhatsApp 傳送至 91230084。",
    infoButton: "參加者須知",
    consentButton: "下載同意書",
    consentLocked: "請先勾選已閱讀參加者須知。",
    change: "需要更改時間？",
    changeText: "目前所有掃描時段已額滿。如需更改，請直接聯絡 91230084。研究團隊確認新的安排前，原有預約仍然有效。",
    waitlist: "你目前在候補名單中。所有掃描時段已額滿，如有空缺研究團隊會直接聯絡你。",
    closed: "目前沒有已確認的掃描時間。如有疑問請聯絡 91230084。",
    completed: "兩次掃描已完成，謝謝你的參與。",
    qr: "PolyU 校園入場二維碼",
    qrSave: "查看 / 儲存二維碼"
  },
  en: {
    title: "ASL Study Participant Portal",
    footer: "Consistency of arterial spin labelling imaging across field strengths",
    phoneTitle: "View my scan schedule",
    phoneHelp: "Enter the phone number you provided when joining the study.",
    phone: "Phone number",
    continue: "View schedule",
    finding: "Looking up…",
    notFound: "We could not find that phone number. Please check and try again.",
    error: "The service is temporarily unavailable. Please try again later.",
    hello: "Hello",
    schedule: "Confirmed scan schedule",
    scanTime: "Scan time",
    arrive: "Recommended arrival",
    arriveNote: "Please arrive about 30 minutes early.",
    polyu: "PolyU UBSN",
    tmh: "Tuen Mun Hospital",
    order: "Scan order",
    polyuFirst: "PolyU → Tuen Mun Hospital",
    tmhFirst: "Tuen Mun Hospital → PolyU",
    contact: "When you arrive, call or WhatsApp 91230084 to contact the study team.",
    polyuSignal: "ZB217 is on LG2 and mobile signal may be weak. Please contact us before taking the lift down to LG2.",
    tmhMeet: "At Tuen Mun Hospital, wait outside the Radiology (X-ray) Department on the ground floor of the Main Block. A staff member will meet you there.",
    preparation: "Before your scans",
    prepItems: [
      "Do not eat for at least 2 hours before scanning.",
      "On the scan day, do not smoke, drink alcohol, coffee, tea, energy drinks, or other caffeinated products.",
      "Do not stay up late the night before; get sufficient sleep.",
      "Avoid strenuous exercise and strong emotional excitement before scanning.",
      "Take medically necessary medication as directed; do not stop prescribed medication on your own. Tell the study team the medication name and dose."
    ],
    guides: "Directions",
    polyuGuide: "Getting to PolyU UBSN / ZB217",
    tmhGuide: "PolyU → Tuen Mun Hospital",
    openPdf: "View / download PDF",
    extra: "Additional information",
    extraHelp: "Tuen Mun Hospital registration requires your height and weight. Please confirm or complete them below.",
    height: "Height (cm)",
    weight: "Weight (kg)",
    save: "Save",
    saving: "Saving…",
    saved: "Saved ✓",
    docs: "Study documents and consent",
    infoText: "Please read the Participant Information Sheet first. It explains the study purpose, procedures, possible risks, confidentiality and incidental-findings arrangements.",
    readAck: "I have read the Participant Information Sheet",
    consentText: "Then download the consent form. In the incidental-findings section, choose whether you wish to be notified by the principal investigator, then enter your name, sign and date the form.",
    returnText: "Send a clear photo or PDF of the completed form to 91230084 by WhatsApp.",
    infoButton: "Participant Information Sheet",
    consentButton: "Download consent form",
    consentLocked: "Please confirm that you have read the Participant Information Sheet first.",
    change: "Need to change your time?",
    changeText: "All scan slots are currently full. Please contact 91230084 directly. Your existing appointment remains valid until the study team confirms a new arrangement.",
    waitlist: "You are currently on the waitlist. All scan slots are full; the study team will contact you directly if a place becomes available.",
    closed: "There is no confirmed scan time at present. Please contact 91230084 if you have any questions.",
    completed: "Both scans are complete. Thank you for taking part.",
    qr: "PolyU campus entry QR code",
    qrSave: "View / save QR code"
  }
};

const state = { lang: "zh", phone: "", participant: null };
const app = document.querySelector("#app");
const tr = key => T[state.lang][key];

function esc(value = "") {
  const el = document.createElement("span");
  el.textContent = value == null ? "" : String(value);
  return el.innerHTML;
}

function safeUrl(value) {
  try {
    const u = new URL(value, location.href);
    return ["http:", "https:"].includes(u.protocol) ? u.href : "";
  } catch { return ""; }
}

function splitSlot(value) {
  const text = String(value || "").trim();
  const m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(.+)$/);
  return m ? { date: `${m[1]}-${m[2].padStart(2,"0")}-${m[3].padStart(2,"0")}`, time: m[4] } : { date: "", time: text };
}

function dateLabel(value) {
  const p = splitSlot(value);
  if (!p.date) return "";
  const [y,m,d] = p.date.split("-");
  return state.lang === "zh" ? `${y} 年 ${Number(m)} 月 ${Number(d)} 日` : new Date(`${p.date}T00:00:00`).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
}

function startMinutes(value) {
  const p = splitSlot(value);
  const m = p.time.match(/(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

function arrivalTime(value) {
  const mins = startMinutes(value);
  if (mins == null) return "";
  const x = (mins - 30 + 1440) % 1440;
  return `${String(Math.floor(x/60)).padStart(2,"0")}:${String(x%60).padStart(2,"0")}`;
}

function orderLabel(order) {
  return order === "POLYU_FIRST" ? tr("polyuFirst") : order === "TMH_FIRST" ? tr("tmhFirst") : "—";
}

function api(payload) {
  return fetch(ASL_CONFIG.WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  }).then(r => r.json()).then(r => {
    if (!r.ok) throw Object.assign(new Error(r.message || "API error"), { code: r.code });
    return r;
  });
}

function translatePage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-text]").forEach(el => el.textContent = tr(el.dataset.text));
  document.querySelector("#language").textContent = state.lang === "zh" ? "English" : "中文";
}

function renderPhone(error = "") {
  document.querySelector("#progress").textContent = "";
  app.innerHTML = `
    <h2>${tr("phoneTitle")}</h2>
    <p class="muted">${tr("phoneHelp")}</p>
    ${error ? `<p class="error">${esc(error)}</p>` : ""}
    <form id="phone-form">
      <label for="phone">${tr("phone")}</label>
      <div class="phone">
        <select id="country" aria-label="Country code">
          <option value="+852">+852 Hong Kong</option>
          <option value="+86">+86 Mainland China</option>
        </select>
        <input id="phone" type="tel" inputmode="tel" autocomplete="tel" required>
      </div>
      <button type="submit">${tr("continue")}</button>
    </form>`;
  document.querySelector("#phone-form").onsubmit = lookup;
}

async function lookup(event) {
  event.preventDefault();
  const btn = event.currentTarget.querySelector("button");
  btn.disabled = true; btn.textContent = tr("finding");
  state.phone = document.querySelector("#country").value + document.querySelector("#phone").value.replace(/\s+/g,"");
  try {
    const r = await api({ action: "lookup", phone: state.phone });
    state.participant = r.participant;
    renderPortal();
  } catch (e) {
    renderPhone(e.code === "NOT_FOUND" ? tr("notFound") : tr("error"));
  }
}

function scanCard(title, value, extra, cls = "") {
  const p = splitSlot(value);
  return `
    <div class="appointment ${cls}">
      <span>${title}</span>
      <strong>${esc(dateLabel(value))}<br>${esc(p.time)}</strong>
      <div class="arrival"><b>${tr("arrive")}：${esc(arrivalTime(value))}</b><small>${tr("arriveNote")}</small></div>
      ${extra ? `<p class="muted compact">${extra}</p>` : ""}
    </div>`;
}

function renderPortal() {
  const p = state.participant;
  document.querySelector("#progress").textContent = "";
  if (!p) return renderPhone();

  if (!p.appointment) {
    app.innerHTML = `
      <h2>${tr("hello")}, ${esc(p.name)}</h2>
      <div class="important">${p.status === "WAITLIST" ? tr("waitlist") : tr("closed")}</div>
      ${contactButtons()}`;
    return;
  }

  const a = p.appointment;
  const firstPolyu = a.order !== "TMH_FIRST";
  const cards = firstPolyu
    ? scanCard(tr("polyu"), a.polyuTime, tr("polyuSignal"), "fixed") + scanCard(tr("tmh"), a.tmhTime, tr("tmhMeet"), "hospital")
    : scanCard(tr("tmh"), a.tmhTime, tr("tmhMeet"), "hospital") + scanCard(tr("polyu"), a.polyuTime, tr("polyuSignal"), "fixed");

  app.innerHTML = `
    <h2>${tr("hello")}, ${esc(p.name)}</h2>
    ${a.polyuCompleted && a.tmhCompleted ? `<p class="success"><strong>${tr("completed")}</strong></p>` : ""}
    <section>
      <h3>${tr("schedule")}</h3>
      <p class="muted"><strong>${tr("order")}：</strong>${orderLabel(a.order)}</p>
      ${cards}
      <div class="important">${tr("contact")}</div>
    </section>

    <section class="panel">
      <h3>${tr("guides")}</h3>
      <div class="link-grid">
        ${fileLink(FILES.polyuGuide, tr("polyuGuide"))}
        ${fileLink(FILES.tmhGuide, tr("tmhGuide"))}
      </div>
    </section>

    <section class="panel">
      <h3>${tr("preparation")}</h3>
      <ul>${tr("prepItems").map(x => `<li>${x}</li>`).join("")}</ul>
    </section>

    ${profileSection(p)}

    <section class="panel">
      <h3>${tr("docs")}</h3>
      <p>${tr("infoText")}</p>
      ${fileLink(FILES.info, tr("infoButton"))}
      <label class="check-row">
        <input id="read-info" type="checkbox">
        <span>${tr("readAck")}</span>
      </label>
      <p>${tr("consentText")}</p>
      <a id="consent-link" class="button-link disabled-link" href="${FILES.consent}" target="_blank" rel="noopener" aria-disabled="true">${tr("consentButton")}</a>
      <small id="consent-help" class="muted block">${tr("consentLocked")}</small>
      <p class="important compact">${tr("returnText")}</p>
    </section>

    ${a.qr ? `
      <section class="panel qr">
        <h3>${tr("qr")}</h3>
        <img src="${esc(safeUrl(a.qr))}" alt="Campus entry QR code">
        <a class="button-link" href="${esc(safeUrl(a.qr))}" target="_blank" rel="noopener">${tr("qrSave")}</a>
      </section>` : ""}

    <section class="panel">
      <h3>${tr("change")}</h3>
      <p>${tr("changeText")}</p>
      ${contactButtons()}
    </section>`;

  const check = document.querySelector("#read-info");
  const consent = document.querySelector("#consent-link");
  const help = document.querySelector("#consent-help");
  check.onchange = () => {
    consent.classList.toggle("disabled-link", !check.checked);
    consent.setAttribute("aria-disabled", String(!check.checked));
    help.hidden = check.checked;
  };
  consent.onclick = e => { if (!check.checked) e.preventDefault(); };

  document.querySelector("#profile-form")?.addEventListener("submit", saveProfile);
}

function fileLink(href, label) {
  return `<a class="file-link" href="${href}" target="_blank" rel="noopener"><strong>${label}</strong><span>${tr("openPdf")}</span></a>`;
}

function contactButtons() {
  return `<div class="actions contact-actions">
    <a class="button-link" href="tel:+85291230084">📞 91230084</a>
    <a class="button-link secondary-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp</a>
  </div>`;
}

function profileSection(p) {
  return `
    <section class="panel">
      <h3>${tr("extra")}</h3>
      <p class="muted">${tr("extraHelp")}</p>
      <form id="profile-form" class="profile-grid">
        <label>${tr("height")}<input id="height" type="number" min="100" max="250" step="0.1" value="${esc(p.height || "")}" required></label>
        <label>${tr("weight")}<input id="weight" type="number" min="20" max="300" step="0.1" value="${esc(p.weight || "")}" required></label>
        <button id="profile-save" type="submit">${tr("save")}</button>
        <span id="profile-status" class="success"></span>
      </form>
    </section>`;
}

async function saveProfile(event) {
  event.preventDefault();
  const btn = document.querySelector("#profile-save");
  const status = document.querySelector("#profile-status");
  btn.disabled = true; btn.textContent = tr("saving"); status.textContent = "";
  try {
    const height = document.querySelector("#height").value;
    const weight = document.querySelector("#weight").value;
    await api({ action: "updateProfile", phone: state.phone, height, weight });
    state.participant.height = height;
    state.participant.weight = weight;
    btn.textContent = tr("save");
    status.textContent = tr("saved");
  } catch {
    status.textContent = tr("error");
  } finally {
    btn.disabled = false;
  }
}

document.querySelector("#language").onclick = () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  translatePage();
  state.participant ? renderPortal() : renderPhone();
};

translatePage();
renderPhone();
