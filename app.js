const SLOT_LABELS = {
  "2026-09-13": "13 September 2026",
  "2026-10-04": "4 October 2026",
  "2026-10-10": "10 October 2026"
};

const NOTICES = {
  zh: [
    "你需要在同一天完成香港理工大學及屯門醫院兩次掃描。",
    "兩個地點之間請預留約 1–1.5 小時公共交通時間。",
    "請準時到達，並遵從研究團隊另行提供的準備指引。",
    "如未能出席或需要更改時間，請盡早聯絡研究團隊。"
  ],
  en: [
    "You must complete both the PolyU and Tuen Mun Hospital scans on the same day.",
    "Please allow approximately 1–1.5 hours for public transport between the two locations.",
    "Please arrive on time and follow the preparation instructions provided separately by the study team.",
    "Contact the study team as soon as possible if you cannot attend or need to change your appointment."
  ]
};

const T = {
  zh: {
    title: "研究掃描預約", footer: "不同場強下動脈自旋標記成像一致性研究",
    phoneTitle: "輸入聯絡電話", phoneHelp: "請使用研究登記時提供的完整電話號碼。", phone: "電話號碼", continue: "繼續",
    finding: "正在查找…", notFound: "找不到這個電話號碼，請檢查後再試。", genericError: "暫時無法連接預約系統，請稍後再試。",
    hello: "你好", arranged: "你的檢查時間已經安排。", already: "你已有預約。",
    notices: "請逐項閱讀注意事項", understand: "我知道了", understood: "已明白 ✓", chooseSlot: "選擇理工掃描時間",
    noSlots: "目前所有時段已滿，我們會稍後聯絡你安排候補時間。", waitlist: "加入候補", waitlisted: "你已加入候補名單。",
    chooseOrder: "選擇兩個地點的次序", polyuFirst: "香港理工大學 → 屯門醫院", tmhFirst: "屯門醫院 → 香港理工大學",
    travel: "請預留約 1–1.5 小時往返兩個地點。", review: "核對預約", date: "日期", polyuTime: "理工時間", tmhTime: "建議屯門醫院時間", order: "次序",
    back: "返回", confirm: "確認預約", booking: "正在確認…", taken: "抱歉，這個時段剛被另一位參與者選取，請選擇其他時間。",
    confirmed: "預約已確認", participant: "參與者", print: "列印／儲存確認書", qrMissing: "校園入場 QR code 將另行提供。", contact: "聯絡電話",
    step: "步驟", polyu: "香港理工大學", tmh: "屯門醫院"
  },
  en: {
    title: "Study scan booking", footer: "Consistency of arterial spin labelling imaging across field strengths",
    phoneTitle: "Enter your contact number", phoneHelp: "Use the full phone number provided when you joined the study.", phone: "Phone number", continue: "Continue",
    finding: "Looking up…", notFound: "We could not find that phone number. Please check and try again.", genericError: "The booking service is temporarily unavailable. Please try again later.",
    hello: "Hello", arranged: "Your appointment has already been arranged.", already: "You already have an appointment.",
    notices: "Read each instruction", understand: "I understand", understood: "Understood ✓", chooseSlot: "Choose a PolyU scan time",
    noSlots: "All slots are currently full. We will contact you about a waitlist time.", waitlist: "Join waitlist", waitlisted: "You have joined the waitlist.",
    chooseOrder: "Choose the order of the two locations", polyuFirst: "PolyU → Tuen Mun Hospital", tmhFirst: "Tuen Mun Hospital → PolyU",
    travel: "Please allow approximately 1–1.5 hours between the two locations.", review: "Review appointment", date: "Date", polyuTime: "PolyU time", tmhTime: "Suggested hospital time", order: "Order",
    back: "Back", confirm: "Confirm booking", booking: "Confirming…", taken: "Sorry, this time was just selected by another participant. Please choose another available time.",
    confirmed: "Appointment confirmed", participant: "Participant", print: "Print / save confirmation", qrMissing: "Campus entry QR code will be provided separately.", contact: "Contact",
    step: "Step", polyu: "The Hong Kong Polytechnic University", tmh: "Tuen Mun Hospital"
  }
};

const state = { lang: "zh", step: "phone", phone: "", participant: null, slots: [], noticesDone: 0, slot: "", order: "" };
const app = document.querySelector("#app");

function tr(key) { return T[state.lang][key]; }
function esc(value = "") { const el = document.createElement("span"); el.textContent = value; return el.innerHTML; }
function slotParts(slot) { const [date, time] = slot.split(" "); return { date, time }; }
function orderLabel(order) { return order === "POLYU_FIRST" ? tr("polyuFirst") : tr("tmhFirst"); }
function setProgress(number) { document.querySelector("#progress").textContent = number ? `${tr("step")} ${number} / 6` : ""; }
function translatePage() { document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en"; document.querySelectorAll("[data-text]").forEach(el => el.textContent = tr(el.dataset.text)); document.querySelector("#language").textContent = state.lang === "zh" ? "English" : "中文"; }

async function api(payload) {
  if (!ASL_CONFIG.WEB_APP_URL.startsWith("https://script.google.com/")) throw new Error("Web app URL is not configured");
  const response = await fetch(ASL_CONFIG.WEB_APP_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!result.ok) throw Object.assign(new Error(result.message || "API error"), { code: result.code, result });
  return result;
}

function renderPhone(error = "") {
  state.step = "phone"; setProgress(1);
  app.innerHTML = `<h2>${tr("phoneTitle")}</h2><p class="muted">${tr("phoneHelp")}</p>${error ? `<p class="error">${esc(error)}</p>` : ""}
    <form id="phone-form"><label for="phone">${tr("phone")}</label><div class="phone"><select id="country" aria-label="Country code"><option value="+852">+852</option><option value="+86">+86</option></select><input id="phone" type="tel" inputmode="tel" autocomplete="tel" required></div><button type="submit">${tr("continue")}</button></form>`;
  document.querySelector("#phone-form").addEventListener("submit", lookup);
}

async function lookup(event) {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button"); button.disabled = true; button.textContent = tr("finding");
  state.phone = document.querySelector("#country").value + document.querySelector("#phone").value;
  try {
    const result = await api({ action: "lookup", phone: state.phone });
    state.participant = result.participant; state.slots = result.availableSlots;
    if (state.participant.appointment) renderConfirmation(); else renderNotices();
  } catch (error) { renderPhone(error.code === "NOT_FOUND" ? tr("notFound") : tr("genericError")); }
}

function renderNotices() {
  state.step = "notices";
  setProgress(2);
  if (["S001", "S002"].includes(state.participant.sid)) {
    app.innerHTML = `<h2>${tr("hello")}, ${esc(state.participant.name)}</h2><p>${tr("arranged")}</p>`; return;
  }
  app.innerHTML = `<h2>${tr("hello")}, ${esc(state.participant.name)}</h2><h3>${tr("notices")}</h3><div id="notices"></div>`;
  const list = document.querySelector("#notices");
  NOTICES[state.lang].forEach((text, index) => {
    const done = index < state.noticesDone, unlocked = index <= state.noticesDone;
    list.insertAdjacentHTML("beforeend", `<div class="notice ${done ? "done" : unlocked ? "" : "locked"}"><p>${esc(text)}</p><button type="button" data-notice="${index}" ${unlocked && !done ? "" : "disabled"}>${done ? tr("understood") : tr("understand")}</button></div>`);
  });
  if (state.noticesDone === NOTICES[state.lang].length) list.insertAdjacentHTML("beforeend", `<div class="actions"><button id="to-slots">${tr("continue")}</button></div>`);
  list.addEventListener("click", event => { if (event.target.dataset.notice) { state.noticesDone++; renderNotices(); } });
  document.querySelector("#to-slots")?.addEventListener("click", renderSlots);
}

function renderSlots(message = "") {
  state.step = "slots";
  setProgress(3);
  const groups = Object.groupBy ? Object.groupBy(state.slots, slot => slot.slice(0, 10)) : state.slots.reduce((all, slot) => ((all[slot.slice(0, 10)] ||= []).push(slot), all), {});
  if (!state.slots.length) {
    app.innerHTML = `<h2>${tr("noSlots")}</h2>${message ? `<p class="success">${tr("waitlisted")}</p>` : `<button id="waitlist">${tr("waitlist")}</button>`}`;
    document.querySelector("#waitlist")?.addEventListener("click", joinWaitlist); return;
  }
  app.innerHTML = `<h2>${tr("chooseSlot")}</h2>${message ? `<p class="error">${message}</p>` : ""}<div id="slots"></div>`;
  const container = document.querySelector("#slots");
  Object.entries(groups).forEach(([date, slots]) => container.insertAdjacentHTML("beforeend", `<div class="date-group"><h3>${SLOT_LABELS[date]}</h3><div class="slot-grid">${slots.map(slot => `<button class="choice" type="button" data-slot="${slot}">${esc(slotParts(slot).time)}</button>`).join("")}</div></div>`));
  container.addEventListener("click", event => { if (event.target.dataset.slot) { state.slot = event.target.dataset.slot; renderOrder(); } });
}

async function joinWaitlist(event) {
  event.target.disabled = true;
  try { await api({ action: "waitlist", phone: state.phone }); renderSlots("done"); }
  catch { event.target.disabled = false; app.insertAdjacentHTML("afterbegin", `<p class="error">${tr("genericError")}</p>`); }
}

function renderOrder() {
  state.step = "order";
  setProgress(4);
  app.innerHTML = `<h2>${tr("chooseOrder")}</h2><p class="muted">${tr("travel")}</p>
    <button class="choice" data-order="POLYU_FIRST"><strong>${tr("polyuFirst")}</strong></button>
    <button class="choice" data-order="TMH_FIRST"><strong>${tr("tmhFirst")}</strong></button>
    <div class="actions"><button class="secondary" id="back">${tr("back")}</button></div>`;
  app.addEventListener("click", event => { if (event.target.closest("[data-order]")) { state.order = event.target.closest("[data-order]").dataset.order; renderReview(); } });
  document.querySelector("#back").addEventListener("click", () => renderSlots());
}

function suggestedHospitalTime(slot, order) {
  const time = slotParts(slot).time.split("–")[0]; let [hours, minutes] = time.split(":").map(Number);
  let total = hours * 60 + minutes + (order === "POLYU_FIRST" ? 120 : -120);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}–${String(Math.floor((total + 30) / 60)).padStart(2, "0")}:${String((total + 30) % 60).padStart(2, "0")}`;
}

function renderReview() {
  state.step = "review";
  setProgress(5); const { date, time } = slotParts(state.slot);
  app.innerHTML = `<h2>${tr("review")}</h2><div class="summary"><div><strong>${tr("date")}</strong><br>${SLOT_LABELS[date]}</div><div><strong>${tr("polyuTime")}</strong><br>${esc(time)}</div><div><strong>${tr("tmhTime")}</strong><br>${suggestedHospitalTime(state.slot, state.order)}</div><div><strong>${tr("order")}</strong><br>${orderLabel(state.order)}</div></div><div class="actions"><button class="secondary" id="back">${tr("back")}</button><button id="confirm">${tr("confirm")}</button></div>`;
  document.querySelector("#back").addEventListener("click", renderOrder); document.querySelector("#confirm").addEventListener("click", book);
}

async function book(event) {
  event.target.disabled = true; event.target.textContent = tr("booking");
  try { const result = await api({ action: "book", phone: state.phone, slot: state.slot, order: state.order, acknowledged: true }); state.participant.appointment = result.appointment; renderConfirmation(); }
  catch (error) { if (error.code === "SLOT_TAKEN") { state.slots = error.result.availableSlots || []; renderSlots(tr("taken")); } else { event.target.disabled = false; app.insertAdjacentHTML("afterbegin", `<p class="error">${tr("genericError")}</p>`); } }
}

function renderConfirmation() {
  state.step = "confirmation";
  setProgress(6); const p = state.participant, a = p.appointment, { date, time } = slotParts(a.polyuTime);
  app.innerHTML = `<h2 class="success">${tr("confirmed")}</h2><div class="summary"><div><strong>${tr("participant")}</strong><br>${esc(p.name)}</div><div><strong>${tr("date")}</strong><br>${SLOT_LABELS[date] || esc(date)}</div><div><strong>${tr("polyuTime")}</strong><br>${esc(time || a.polyuTime)}</div><div><strong>${tr("tmhTime")}</strong><br>${esc(a.tmhTime)}</div><div><strong>${tr("order")}</strong><br>${orderLabel(a.order)}</div></div>
    <address><strong>${tr("polyu")}</strong><br>Block Z, Basement 2, Room ZB216<br>UBSN Neuroscience Laboratory<br>${tr("contact")}: ${esc(ASL_CONFIG.POLYU_CONTACT)}</address>
    <address><strong>${tr("tmh")}</strong><br>Department of Radiology, Ground Floor, Main Block<br>23 Tsing Chung Koon Road, Tuen Mun<br>${tr("contact")}: ${esc(ASL_CONFIG.TMH_CONTACT)}</address>
    <div class="qr">${a.qr ? `<span>Campus QR</span><img src="${esc(a.qr)}" alt="Campus entry QR code">` : tr("qrMissing")}</div>
    <div class="actions no-print"><button onclick="window.print()">${tr("print")}</button></div>`;
}

document.querySelector("#language").addEventListener("click", () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  translatePage();
  ({ phone: renderPhone, notices: renderNotices, slots: renderSlots, order: renderOrder, review: renderReview, confirmation: renderConfirmation }[state.step])();
});
translatePage(); renderPhone();
