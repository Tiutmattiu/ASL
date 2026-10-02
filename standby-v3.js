const INCENTIVE_AMOUNT = 200;

const FILES = {
  info: "assets/participant-information-sheet.pdf",
  consent: "assets/consent-form.pdf",
  polyuGuide: "assets/polyu-to-ubsn.pdf",
  tmhGuide: "assets/polyu-to-tmh.pdf"
};

const SLOT_LABELS = {
  zh: { "2026-10-04": "2026 年 10 月 4 日" },
  en: { "2026-10-04": "4 October 2026" }
};

const STANDBY_PLAN = {
  A: { order:"TMH_FIRST", polyu:"2026-10-04 12:30–13:00", tmh:"2026-10-04 10:30–11:00" },
  B: { order:"POLYU_FIRST", polyu:"2026-10-04 13:00–13:30", tmh:"2026-10-04 15:00–15:30" },
  C: { order:"TMH_FIRST", polyu:"2026-10-04 16:00–16:30", tmh:"2026-10-04 13:00–13:30" },
  D: { order:"TMH_FIRST", polyu:"2026-10-04 16:30–17:00", tmh:"2026-10-04 13:30–14:00" },
  E: { order:"TMH_FIRST", polyu:"2026-10-04 17:00–17:30", tmh:"2026-10-04 14:00–14:30" },
  F: { order:"TMH_FIRST", polyu:"2026-10-04 17:30–18:00", tmh:"2026-10-04 14:30–15:00" },
  G: { order:"TMH_FIRST", polyu:"2026-10-04 18:00–18:30", tmh:"2026-10-04 15:30–16:00" }
};

const NOTICES = {
  zh: [
    "你需要在<strong>同一天</strong>完成香港理工大學及屯門醫院兩次 MRI 掃描。",
    "香港理工大學及屯門醫院的<strong>掃描時間均為固定時間</strong>。如候補成功，請按照研究團隊確認的兩個時間出席。",
    "兩個地點都建議在<strong>掃描時間前約 30 分鐘到達</strong>。",
    "掃描前請保持<strong>至少 2 小時未進食</strong>，即距離上一次進食至少 2 小時。",
    "掃描當天<strong>請勿吸煙、飲酒、飲用咖啡或茶</strong>，並避免能量飲品及其他含咖啡因產品。",
    "掃描前一晚<strong>請勿熬夜</strong>，並保持充足睡眠。",
    "掃描前請避免劇烈運動及強烈情緒激動，保持正常休息。",
    "掃描前 3 天請盡量避免不必要的藥物。如因醫療需要必須服藥，請按醫生指示正常服用，<strong>不要自行停藥</strong>，並告知研究團隊藥物名稱及劑量。",
    "香港理工大學與屯門醫院之間請預留約 <strong>1–1.5 小時</strong>公共交通時間。",
    "到達香港理工大學或屯門醫院後，請直接<strong>致電或 WhatsApp 91230084</strong>。屯門醫院請在主座地下放射科（X光部門）門口等候工作人員。",
    `完成兩次掃描後可獲 <strong>HK$${INCENTIVE_AMOUNT}</strong> 研究參與津貼；津貼只發放一次。`
  ],
  en: [
    "You must complete both MRI scans at <strong>PolyU and Tuen Mun Hospital on the same day</strong>.",
    "The scan times at <strong>both locations are fixed</strong>. If a standby place is confirmed, attend at the two times confirmed by the study team.",
    "Please arrive about <strong>30 minutes before the scan time at both locations</strong>.",
    "Please <strong>do not eat for at least 2 hours</strong> before scanning.",
    "On the scan day, <strong>do not smoke, drink alcohol, coffee or tea</strong>, and avoid energy drinks and other caffeinated products.",
    "Please <strong>do not stay up late</strong> the night before and get sufficient sleep.",
    "Avoid strenuous exercise and strong emotional excitement before scanning.",
    "Avoid unnecessary medication for 3 days where possible. If medication is medically necessary, take it as directed and <strong>do not stop prescribed medication on your own</strong>. Tell the study team the name and dose.",
    "Allow approximately <strong>1–1.5 hours</strong> for public transport between PolyU and Tuen Mun Hospital.",
    "On arrival at either site, <strong>call or WhatsApp 91230084</strong>. At Tuen Mun Hospital, wait outside Radiology (X-ray) on the ground floor of the Main Block.",
    `After completing both scans, you will receive one <strong>HK$${INCENTIVE_AMOUNT}</strong> study participation incentive.`
  ]
};

const T = {
  zh: {
    title:"研究掃描候補登記",
    footer:"不同場強下動脈自旋標記成像一致性研究",
    step:"步驟",
    continue:"繼續",
    back:"返回",

    studyTitle:"研究資料",
    studyName:"研究題目：不同場強（1.5T vs 3.0T）下動脈自旋標記成像一致性研究",
    studyLead:"本研究由香港理工大學康復治療科學系張慧博士進行，並已獲香港理工大學倫理審查批准（HSEARS20260317004）。",
    studySummary:"本研究使用動脈自旋標記（ASL）磁力共振成像，評估 1.5T 與 3.0T MRI 所測得腦血流相關參數的一致性。MRI 使用磁場和無線電波成像，不使用 X 光或其他電離輻射。",
    infoRequired:"請先閱讀完整《參加者須知》，再繼續候補登記。",
    infoButton:"閱讀／下載參加者須知",
    consentIntro:"你亦可以先閱讀研究同意書。若之後獲正式確認參加，需要在同意書中選擇是否希望被通知 MRI 的意外發現，並填寫姓名、簽署及日期後回傳。",
    consentButton:"閱讀／下載同意書",
    infoAck:"我已閱讀《參加者須知》，並理解研究內容、程序及可能風險。",
    mustRead:"請先閱讀參加者須知並勾選確認。",

    detailsTitle:"基本資料及資格確認",
    standbyWarning:"目前為 10 月 4 日臨時候補登記，<strong>不是正式預約</strong>。只有收到研究團隊以電話或 WhatsApp 明確確認後，才代表候補成功；未收到確認請不要自行前往。",
    name:"姓名",
    phone:"電話號碼",
    age:"年齡",
    gender:"性別",
    female:"女",
    male:"男",
    other:"其他",
    height:"身高（cm）",
    weight:"體重（kg）",
    handedness:"慣用手",
    right:"右手",
    left:"左手",
    choose:"請選擇",
    eligibility:"我確認：本人 18–40 歲；沒有精神或神經系統疾病病史；沒有 MRI 禁忌（例如心臟起搏器、不能移除的金屬植入物／裝置或嚴重幽閉恐懼）；如適用，現時並非懷孕或備孕；並能在同一天完成兩次 MRI 掃描。",
    invalidEligibility:"請確認參與資格後再繼續。",

    notices:"請逐項閱讀掃描準備事項",
    understand:"我知道了",
    understood:"已明白 ✓",

    chooseOrder:"你可以配合哪一種掃描次序？",
    sameDay:"兩次掃描需要在同一天完成。",
    scheduleRule:"10 月 4 日目前只有部分時段可能臨時釋出；以下時間均為固定掃描時間。",
    travelRule:"兩地之間請預留約 1–1.5 小時交通時間；兩個地點均建議提前約 30 分鐘到達。",
    polyuFirst:"香港理工大學 → 屯門醫院",
    tmhFirst:"屯門醫院 → 香港理工大學",

    chooseSlot:"選擇你可以配合的候補安排",
    multiHelp:"你可以選擇多個可配合的安排。選得越多，越容易安排到臨時空缺。",
    noSlots:"目前沒有符合此掃描次序的候補安排。",
    polyuFixed:"香港理工大學：固定掃描時間",
    tmhFixed:"屯門醫院：固定掃描時間",
    recommendedArrival:"建議到達",
    select:"可以配合",
    selected:"已選擇 ✓",

    review:"核對候補資料",
    participant:"參加者",
    order:"次序",
    selectedArrangements:"可配合的候補安排",
    candidateNote:"提交後只是加入候補名單，不會自動取得任何時段。研究團隊會根據實際空缺另行聯絡確認。",
    routes:"路線指引",
    polyuRoute:"前往 PolyU UBSN / ZB217",
    tmhRoute:"PolyU → 屯門醫院",
    contact:"到達後聯絡：91230084",
    submit:"提交候補登記",
    submitting:"正在提交…",
    needSlot:"請至少選擇一個可以配合的候補安排。",
    success:"候補登記已收到",
    successBody:"謝謝。這不是正式預約。若有合適空缺，研究團隊會以電話或 WhatsApp 聯絡你並明確確認兩個固定掃描時間；未收到確認請不要自行前往。",
    already:"這個電話已經存在於研究名單中。如需更改安排，請直接 WhatsApp 91230084。",
    genericError:"暫時無法提交，請直接 WhatsApp 91230084。"
  },
  en: {
    title:"Study Scan Standby Registration",
    footer:"Consistency of arterial spin labelling imaging across field strengths",
    step:"Step",
    continue:"Continue",
    back:"Back",

    studyTitle:"Study information",
    studyName:"Study: Consistency of Arterial Spin Labeling (ASL) imaging at different field strengths (1.5T vs 3.0T)",
    studyLead:"This study is conducted by Dr Hui Zhang of the Department of Rehabilitation Sciences, The Hong Kong Polytechnic University, and has PolyU ethics approval (HSEARS20260317004).",
    studySummary:"The study uses arterial spin labelling (ASL) MRI to assess the consistency of brain-perfusion measurements at 1.5T and 3.0T. MRI uses magnetic fields and radio waves and does not use X-rays or other ionising radiation.",
    infoRequired:"Please read the full Participant Information Sheet before continuing.",
    infoButton:"Read / download information sheet",
    consentIntro:"You may also review the consent form now. If you are later formally confirmed, you will need to choose whether you wish to be notified about incidental MRI findings, then enter your name, sign and date the form and return it.",
    consentButton:"Read / download consent form",
    infoAck:"I have read the Participant Information Sheet and understand the study, procedures and possible risks.",
    mustRead:"Please read the Participant Information Sheet and tick the acknowledgement first.",

    detailsTitle:"Basic details and eligibility",
    standbyWarning:"This is standby registration for 4 October, <strong>not a confirmed appointment</strong>. A place is confirmed only after the study team explicitly confirms it by phone or WhatsApp. Do not attend unless you receive confirmation.",
    name:"Name",
    phone:"Phone number",
    age:"Age",
    gender:"Gender",
    female:"Female",
    male:"Male",
    other:"Other",
    height:"Height (cm)",
    weight:"Weight (kg)",
    handedness:"Handedness",
    right:"Right",
    left:"Left",
    choose:"Choose",
    eligibility:"I confirm that I am aged 18–40; have no history of psychiatric or neurological disease; have no MRI contraindication such as a cardiac pacemaker, non-removable metallic implant/device, or severe claustrophobia; if applicable, I am not pregnant or planning pregnancy; and I can complete both MRI scans on the same day.",
    invalidEligibility:"Please confirm the eligibility statement before continuing.",

    notices:"Please read each scan preparation instruction",
    understand:"I understand",
    understood:"Understood ✓",

    chooseOrder:"Which scan order could you attend?",
    sameDay:"Both scans must be completed on the same day.",
    scheduleRule:"Only some 4 October appointments may become available at short notice; all times shown below are fixed scan times.",
    travelRule:"Allow approximately 1–1.5 hours between sites. Please arrive about 30 minutes early at both locations.",
    polyuFirst:"PolyU → Tuen Mun Hospital",
    tmhFirst:"Tuen Mun Hospital → PolyU",

    chooseSlot:"Select standby arrangements you could attend",
    multiHelp:"You may select more than one arrangement. Selecting more options makes it easier to match you to a late vacancy.",
    noSlots:"There are no standby arrangements for this scan order.",
    polyuFixed:"PolyU: fixed scan time",
    tmhFixed:"Tuen Mun Hospital: fixed scan time",
    recommendedArrival:"Recommended arrival",
    select:"I can attend",
    selected:"Selected ✓",

    review:"Review standby registration",
    participant:"Participant",
    order:"Order",
    selectedArrangements:"Standby arrangements you can attend",
    candidateNote:"Submitting this form only joins the standby list; it does not reserve a slot. The study team will contact you separately if a vacancy becomes available.",
    routes:"Directions",
    polyuRoute:"Getting to PolyU UBSN / ZB217",
    tmhRoute:"PolyU → Tuen Mun Hospital",
    contact:"Contact on arrival: 91230084",
    submit:"Submit standby registration",
    submitting:"Submitting…",
    needSlot:"Select at least one standby arrangement you could attend.",
    success:"Standby registration received",
    successBody:"Thank you. This is not a confirmed appointment. If a suitable vacancy becomes available, the study team will contact you by phone or WhatsApp and explicitly confirm both fixed scan times. Do not attend unless you receive confirmation.",
    already:"This phone number is already on the study list. Please WhatsApp 91230084 if you need to change an arrangement.",
    genericError:"Unable to submit right now. Please WhatsApp 91230084."
  }
};

const state = {
  lang:"zh",
  step:"study",
  noticesDone:0,
  order:"",
  selectedSlots:[],
  details:null,
  informationRead:false
};

const app = document.querySelector("#app");
const tr = key => T[state.lang][key];

function esc(value="") {
  const el=document.createElement("span");
  el.textContent=value==null?"":String(value);
  return el.innerHTML;
}

function setProgress(n) {
  document.querySelector("#progress").textContent = n ? `${tr("step")} ${n} / 7` : "";
}

function translatePage() {
  document.documentElement.lang=state.lang==="zh"?"zh-Hant":"en";
  document.querySelectorAll("[data-text]").forEach(el=>el.textContent=tr(el.dataset.text));
  document.querySelector("#language").textContent=state.lang==="zh"?"English":"中文";
}

function slotParts(value) {
  const text=String(value||"");
  const i=text.indexOf(" ");
  return i<0?{date:"",time:text}:{date:text.slice(0,i),time:text.slice(i+1)};
}

function arrivalTime(value) {
  const time=slotParts(value).time;
  const m=time.match(/(\d{1,2}):(\d{2})/);
  if(!m) return "";
  const total=Number(m[1])*60+Number(m[2])-30;
  const x=(total+1440)%1440;
  return String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0");
}

function dateLabel(value) {
  const d=slotParts(value).date;
  return SLOT_LABELS[state.lang][d]||d;
}

function orderLabel(order) {
  return order==="POLYU_FIRST"?tr("polyuFirst"):tr("tmhFirst");
}

function fileButton(href,label) {
  return `<a class="button-link" href="${href}" target="_blank" rel="noopener">${label}</a>`;
}

async function api(payload) {
  const response=await fetch(ASL_CONFIG.WEB_APP_URL,{
    method:"POST",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(payload)
  });
  const result=await response.json();
  if(!result.ok) throw Object.assign(new Error(result.message||"API error"),{code:result.code});
  return result;
}

// STEP 1
function renderStudy(error="") {
  state.step="study";
  setProgress(1);
  app.innerHTML=`
    <h2>${tr("studyTitle")}</h2>
    ${error?`<p class="error">${esc(error)}</p>`:""}
    <p class="study-title">${tr("studyName")}</p>
    <p>${tr("studyLead")}</p>
    <p>${tr("studySummary")}</p>

    <div class="important">
      <p><strong>${tr("infoRequired")}</strong></p>
      <div class="actions">
        ${fileButton(FILES.info,tr("infoButton"))}
        ${fileButton(FILES.consent,tr("consentButton"))}
      </div>
      <p class="muted" style="margin-top:14px">${tr("consentIntro")}</p>
    </div>

    <label class="check-row">
      <input id="info-ack" type="checkbox" ${state.informationRead?"checked":""}>
      <span>${tr("infoAck")}</span>
    </label>

    <div class="actions">
      <button id="to-details">${tr("continue")}</button>
    </div>
  `;

  document.querySelector("#info-ack").onchange=e=>state.informationRead=e.target.checked;
  document.querySelector("#to-details").onclick=()=>{
    if(!state.informationRead) return renderStudy(tr("mustRead"));
    renderDetails();
  };
}

// STEP 2
function renderDetails(error="") {
  state.step="details";
  setProgress(2);
  const d=state.details||{};
  app.innerHTML=`
    <h2>${tr("detailsTitle")}</h2>
    <div class="important"><p>${tr("standbyWarning")}</p></div>
    ${error?`<p class="error">${esc(error)}</p>`:""}

    <form id="details-form">
      <div class="profile-grid">
        <label>${tr("name")}<input id="name" value="${esc(d.name||"")}" required></label>
        <label>${tr("phone")}<input id="phone" type="tel" inputmode="tel" value="${esc(d.phone||"")}" required></label>
        <label>${tr("age")}<input id="age" type="number" min="18" max="40" value="${esc(d.age||"")}" required></label>
        <label>${tr("gender")}
          <select id="gender" required>
            <option value="">${tr("choose")}</option>
            <option value="F" ${d.gender==="F"?"selected":""}>${tr("female")}</option>
            <option value="M" ${d.gender==="M"?"selected":""}>${tr("male")}</option>
            <option value="OTHER" ${d.gender==="OTHER"?"selected":""}>${tr("other")}</option>
          </select>
        </label>
        <label>${tr("height")}<input id="height" type="number" min="100" max="250" step="0.1" value="${esc(d.height||"")}" required></label>
        <label>${tr("weight")}<input id="weight" type="number" min="20" max="300" step="0.1" value="${esc(d.weight||"")}" required></label>
        <label>${tr("handedness")}
          <select id="handedness" required>
            <option value="">${tr("choose")}</option>
            <option value="R" ${d.handedness==="R"?"selected":""}>${tr("right")}</option>
            <option value="L" ${d.handedness==="L"?"selected":""}>${tr("left")}</option>
          </select>
        </label>
      </div>

      <label class="check-row">
        <input id="eligible" type="checkbox" ${d.eligible?"checked":""}>
        <span>${tr("eligibility")}</span>
      </label>

      <div class="actions">
        <button class="secondary" type="button" id="back">${tr("back")}</button>
        <button type="submit">${tr("continue")}</button>
      </div>
    </form>
  `;

  document.querySelector("#back").onclick=renderStudy;
  document.querySelector("#details-form").onsubmit=e=>{
    e.preventDefault();
    const eligible=document.querySelector("#eligible").checked;
    if(!eligible) return renderDetails(tr("invalidEligibility"));
    state.details={
      name:document.querySelector("#name").value.trim(),
      phone:document.querySelector("#phone").value.trim(),
      age:document.querySelector("#age").value,
      gender:document.querySelector("#gender").value,
      height:document.querySelector("#height").value,
      weight:document.querySelector("#weight").value,
      handedness:document.querySelector("#handedness").value,
      eligible:true
    };
    state.noticesDone=0;
    renderNotices();
  };
}

// STEP 3 — copied from the original booking flow
function renderNotices() {
  state.step="notices";
  setProgress(3);
  app.innerHTML=`<h2>${tr("notices")}</h2><div id="notices"></div>`;
  const list=document.querySelector("#notices");

  NOTICES[state.lang].forEach((text,index)=>{
    const done=index<state.noticesDone;
    const unlocked=index<=state.noticesDone;
    list.insertAdjacentHTML("beforeend",`
      <div class="notice ${done?"done":unlocked?"":"locked"}">
        <p>${text}</p>
        <button type="button" data-notice="${index}" ${unlocked&&!done?"":"disabled"}>
          ${done?tr("understood"):tr("understand")}
        </button>
      </div>
    `);
  });

  if(state.noticesDone===NOTICES[state.lang].length){
    list.insertAdjacentHTML("beforeend",`
      <div class="actions">
        <button class="secondary" id="back">${tr("back")}</button>
        <button id="to-order">${tr("continue")}</button>
      </div>`);
  }

  list.onclick=e=>{
    if(e.target.hasAttribute("data-notice")){
      state.noticesDone++;
      renderNotices();
    }
  };
  document.querySelector("#back")?.addEventListener("click",renderDetails);
  document.querySelector("#to-order")?.addEventListener("click",renderOrder);
}

// STEP 4
function renderOrder() {
  state.step="order";
  setProgress(4);
  app.innerHTML=`
    <h2>${tr("chooseOrder")}</h2>

    <div class="important">
      <p><strong>${tr("sameDay")}</strong></p>
      <p>${tr("scheduleRule")}</p>
      <p>${tr("travelRule")}</p>
    </div>

    <button class="choice" data-order="POLYU_FIRST">
      <strong>${tr("polyuFirst")}</strong>
    </button>

    <button class="choice" data-order="TMH_FIRST">
      <strong>${tr("tmhFirst")}</strong>
    </button>

    <div class="actions">
      <button class="secondary" id="back">${tr("back")}</button>
    </div>
  `;

  app.querySelectorAll("[data-order]").forEach(button=>{
    button.onclick=()=>{
      state.order=button.dataset.order;
      renderSlots();
    };
  });
  document.querySelector("#back").onclick=renderNotices;
}

// STEP 5
function renderSlots(message="") {
  state.step="slots";
  setProgress(5);

  const visible=Object.entries(STANDBY_PLAN).filter(([,p])=>p.order===state.order);
  app.innerHTML=`
    <h2>${tr("chooseSlot")}</h2>
    <p class="muted">${tr("multiHelp")}</p>
    ${message?`<p class="error">${esc(message)}</p>`:""}
    <div class="date-group">
      <h3>${SLOT_LABELS[state.lang]["2026-10-04"]}</h3>
      <div class="slot-grid">
        ${visible.map(([id,p])=>{
          const selected=state.selectedSlots.includes(id);
          return `
            <button class="choice ${selected?"selected":""}" type="button" data-slot="${id}">
              <strong>${esc(slotParts(p.polyu).time)}</strong>
              <small>${tr("polyuFixed")}<br>${esc(slotParts(p.polyu).time)}<br>${tr("recommendedArrival")} ${arrivalTime(p.polyu)}</small>
              <small>${tr("tmhFixed")}<br>${esc(slotParts(p.tmh).time)}<br>${tr("recommendedArrival")} ${arrivalTime(p.tmh)}</small>
              <small>${selected?tr("selected"):tr("select")}</small>
            </button>`;
        }).join("")}
      </div>
    </div>

    <div class="actions">
      <button class="secondary" id="back">${tr("back")}</button>
      <button id="review">${tr("continue")}</button>
    </div>
  `;

  app.querySelectorAll("[data-slot]").forEach(button=>{
    button.onclick=()=>{
      const id=button.dataset.slot;
      state.selectedSlots=state.selectedSlots.includes(id)
        ? state.selectedSlots.filter(x=>x!==id)
        : [...state.selectedSlots,id];
      renderSlots();
    };
  });
  document.querySelector("#back").onclick=renderOrder;
  document.querySelector("#review").onclick=()=>{
    if(!state.selectedSlots.length) return renderSlots(tr("needSlot"));
    renderReview();
  };
}

// STEP 6
function renderReview() {
  state.step="review";
  setProgress(6);
  const d=state.details;

  app.innerHTML=`
    <h2>${tr("review")}</h2>

    <div class="summary">
      <div><strong>${tr("participant")}</strong><br>${esc(d.name)}</div>
      <div><strong>${tr("phone")}</strong><br>${esc(d.phone)}</div>
    </div>

    <div class="important">
      <p><strong>${tr("candidateNote")}</strong></p>
    </div>

    <h3>${tr("selectedArrangements")}</h3>
    ${state.selectedSlots.map(id=>{
      const p=STANDBY_PLAN[id];
      return `
        <div class="summary standby-review">
          <div>
            <strong>${tr("order")}</strong><br>${orderLabel(p.order)}
          </div>
          <div>
            <strong>${tr("tmhFixed")}</strong><br>
            ${dateLabel(p.tmh)}<br>${esc(slotParts(p.tmh).time)}<br>
            <span class="muted">${tr("recommendedArrival")} ${arrivalTime(p.tmh)}</span>
          </div>
          <div>
            <strong>${tr("polyuFixed")}</strong><br>
            ${dateLabel(p.polyu)}<br>${esc(slotParts(p.polyu).time)}<br>
            <span class="muted">${tr("recommendedArrival")} ${arrivalTime(p.polyu)}</span>
          </div>
        </div>`;
    }).join("")}

    <section class="preparation">
      <h3>${tr("routes")}</h3>
      <div class="actions">
        ${fileButton(FILES.polyuGuide,tr("polyuRoute"))}
        ${fileButton(FILES.tmhGuide,tr("tmhRoute"))}
      </div>
      <p style="margin-top:14px"><strong>${tr("contact")}</strong></p>
    </section>

    <div class="actions">
      <button class="secondary" id="back">${tr("back")}</button>
      <button id="submit">${tr("submit")}</button>
    </div>
  `;

  document.querySelector("#back").onclick=()=>renderSlots();
  document.querySelector("#submit").onclick=submitStandby;
}

// STEP 7
async function submitStandby(event) {
  event.target.disabled=true;
  event.target.textContent=tr("submitting");

  try {
    await api({
      action:"standbySignup",
      ...state.details,
      preferences:state.selectedSlots,
      informationRead:state.informationRead
    });

    state.step="success";
    setProgress(7);
    app.innerHTML=`
      <h2 class="success">${tr("success")}</h2>
      <p>${tr("successBody")}</p>
      <div class="important">
        <strong>91230084</strong><br>
        <a href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    `;
  } catch(error) {
    const msg=error.code==="ALREADY_REGISTERED"?tr("already"):tr("genericError");
    event.target.disabled=false;
    event.target.textContent=tr("submit");
    app.insertAdjacentHTML("afterbegin",`<p class="error">${esc(msg)}</p>`);
  }
}

document.querySelector("#language").addEventListener("click",()=>{
  state.lang=state.lang==="zh"?"en":"zh";
  translatePage();

  const render={
    study:renderStudy,
    details:renderDetails,
    notices:renderNotices,
    order:renderOrder,
    slots:renderSlots,
    review:renderReview,
    success:()=>{}
  }[state.step];

  if(render) render();
});

translatePage();
renderStudy();
