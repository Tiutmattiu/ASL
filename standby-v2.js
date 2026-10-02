const FILES = {
  info: "assets/participant-information-sheet.pdf",
  consent: "assets/consent-form.pdf",
  polyuGuide: "assets/polyu-to-ubsn.pdf",
  tmhGuide: "assets/polyu-to-tmh.pdf"
};

const SLOTS = [
  { id:"A", polyu:"12:30–13:00", tmh:"10:30–11:00", order:"TMH_FIRST" },
  { id:"B", polyu:"13:00–13:30", tmh:"15:00–15:30", order:"POLYU_FIRST" },
  { id:"C", polyu:"16:00–16:30", tmh:"13:00–13:30", order:"TMH_FIRST" },
  { id:"D", polyu:"16:30–17:00", tmh:"13:30–14:00", order:"TMH_FIRST" },
  { id:"E", polyu:"17:00–17:30", tmh:"14:00–14:30", order:"TMH_FIRST" },
  { id:"F", polyu:"17:30–18:00", tmh:"14:30–15:00", order:"TMH_FIRST" },
  { id:"G", polyu:"18:00–18:30", tmh:"15:30–16:00", order:"TMH_FIRST" }
];

const T = {
  zh: {
    pageTitle:"研究掃描候補登記",
    footer:"不同場強下動脈自旋標記成像一致性研究",
    introTitle:"研究簡介",
    intro:[
      "本研究比較 1.5T 與 3.0T 磁力共振（MRI）下動脈自旋標記（ASL）腦血流成像結果的一致性。",
      "MRI 使用磁場及無線電波成像，不使用 X 光或其他電離輻射。",
      "每位參加者需要完成兩次 MRI 掃描，地點分別為香港理工大學及屯門醫院。"
    ],
    standbyTitle:"10 月 4 日臨時候補",
    standbyText:"目前有數個 10 月 4 日時段可能臨時釋出。這是候補登記，不是正式預約。只有收到研究團隊以電話或 WhatsApp 明確確認兩個掃描時間，才代表預約成功；未收到確認請不要自行前往。",
    eligibilityTitle:"參與資格",
    eligibility:[
      "年齡 18–40 歲。",
      "沒有精神疾病或神經系統疾病病史。",
      "沒有 MRI 禁忌，例如心臟起搏器、不能移除的金屬植入物／裝置，或嚴重幽閉恐懼。",
      "如適用，現時並非懷孕或備孕。",
      "可以在同一天完成香港理工大學及屯門醫院兩次掃描。"
    ],
    procedureTitle:"掃描安排與準備",
    notices:[
      "兩次掃描需要在同一天完成。",
      "兩個地點的掃描時間都是固定時間；正式確認後，請按照研究團隊提供的時間出席。",
      "香港理工大學及屯門醫院均建議在掃描時間前約 30 分鐘到達。",
      "兩地之間請預留約 1–1.5 小時公共交通時間。",
      "掃描前至少 2 小時不要進食。",
      "掃描當天不要吸煙、飲酒、飲用咖啡、茶、能量飲品或其他含咖啡因產品。",
      "掃描前一晚不要熬夜，並保持充足睡眠。",
      "掃描前避免劇烈運動及強烈情緒激動。",
      "掃描前 3 天請盡量避免不必要的藥物；如因醫療需要必須服藥，請按醫生指示正常服用，不要自行停藥，並告知研究團隊藥物名稱及劑量。",
      "如不能出席或需要更改時間，請直接聯絡研究團隊，不要自行更改。",
      "完成兩次掃描後可獲 HK$200 研究參與津貼，津貼只發放一次。"
    ],
    routeTitle:"到達及路線",
    routeContact:"到達後請直接致電或 WhatsApp 91230084 聯絡研究團隊。",
    polyuRoute:"前往香港理工大學 UBSN / ZB217",
    polyuNote:"ZB217 位於 LG2，手機訊號可能較弱；建議乘升降機到 LG2 前先聯絡我們。",
    tmhRoute:"香港理工大學 → 屯門醫院",
    tmhNote:"到達屯門醫院後，請到主座地下放射科（X光部門）門口等候，工作人員會前往接你。",
    docsTitle:"研究文件及同意書",
    docsText:"請先閱讀完整《參加者須知》。其中包括研究目的、流程、風險、保密安排，以及 MRI 中可能出現意外發現的處理方式。",
    infoBtn:"閱讀 / 下載參加者須知",
    consentText:"同意書亦可先下載閱讀。正式參加前，需要在意外發現部分選擇「希望得到通知」或「不希望得到通知」，並填寫姓名、簽署及日期；完成後可把清晰照片或 PDF WhatsApp 至 91230084。",
    consentBtn:"閱讀 / 下載同意書",
    readAck:"我已閱讀參加者須知，並明白上述候補及掃描安排",
    formTitle:"候補資料",
    formHelp:"請填寫以下資料，並勾選你可以出席的所有安排。選得越多，越容易安排到臨時空缺。",
    name:"姓名",
    phone:"電話",
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
    scheduleTitle:"可出席的 10 月 4 日安排",
    polyu:"香港理工大學",
    tmh:"屯門醫院",
    scanTime:"掃描",
    arrive:"建議到達",
    order:"次序",
    tFirst:"屯門醫院 → 香港理工大學",
    pFirst:"香港理工大學 → 屯門醫院",
    eligibilityAck:"我確認上述參與資格適用於我，並會在研究團隊正式確認後才前往。",
    submit:"提交候補登記",
    submitting:"提交中…",
    needSlot:"請至少選擇一個可以出席的安排。",
    needRead:"請先閱讀參加者須知並勾選確認。",
    successTitle:"候補登記已收到",
    success1:"謝謝。這不是正式預約確認。",
    success2:"如有適合的空缺，研究團隊會以電話或 WhatsApp 聯絡你，並明確確認兩個固定掃描時間。若未收到確認，請不要自行前往。",
    already:"這個電話已經存在於研究名單中。如需更改安排，請直接 WhatsApp 91230084。",
    error:"暫時無法提交，請直接 WhatsApp 91230084。",
    open:"查看 PDF"
  },
  en: {
    pageTitle:"Study Scan Standby Registration",
    footer:"Consistency of arterial spin labelling imaging across field strengths",
    introTitle:"About the study",
    intro:[
      "This study compares the consistency of arterial spin labelling (ASL) brain-perfusion MRI measurements at 1.5T and 3.0T.",
      "MRI uses magnetic fields and radio waves and does not use X-rays or other ionising radiation.",
      "Each participant completes two MRI scans, one at The Hong Kong Polytechnic University and one at Tuen Mun Hospital."
    ],
    standbyTitle:"4 October standby registration",
    standbyText:"Several 4 October appointments may become available at short notice. This is standby registration, not a confirmed booking. Your appointment is confirmed only after the study team explicitly confirms both scan times by phone or WhatsApp. Do not travel to either site without confirmation.",
    eligibilityTitle:"Eligibility",
    eligibility:[
      "Age 18–40 years.",
      "No history of psychiatric or neurological disease.",
      "No MRI contraindication such as a cardiac pacemaker, non-removable metallic implant/device, or severe claustrophobia.",
      "If applicable, not currently pregnant or planning pregnancy.",
      "Able to complete both PolyU and Tuen Mun Hospital scans on the same day."
    ],
    procedureTitle:"Scan arrangements and preparation",
    notices:[
      "Both scans must be completed on the same day.",
      "Both sites now use fixed scan times; after confirmation, attend at the times given by the study team.",
      "Please arrive about 30 minutes before the scan time at both PolyU and Tuen Mun Hospital.",
      "Allow approximately 1–1.5 hours for public transport between the two sites.",
      "Do not eat for at least 2 hours before scanning.",
      "On the scan day, do not smoke, drink alcohol, coffee, tea, energy drinks, or other caffeinated products.",
      "Do not stay up late the night before; get sufficient sleep.",
      "Avoid strenuous exercise and strong emotional excitement before scanning.",
      "Avoid unnecessary medication for 3 days where possible. If medication is medically necessary, take it as directed; do not stop prescribed medication on your own, and tell the team the name and dose.",
      "If you cannot attend or need to change a time, contact the study team directly; do not change it yourself.",
      "After completing both scans, you will receive one HK$200 study participation incentive."
    ],
    routeTitle:"Arrival and directions",
    routeContact:"When you arrive, call or WhatsApp 91230084.",
    polyuRoute:"Getting to PolyU UBSN / ZB217",
    polyuNote:"ZB217 is on LG2 and mobile signal may be weak. Contact us before taking the lift down to LG2.",
    tmhRoute:"PolyU → Tuen Mun Hospital",
    tmhNote:"At Tuen Mun Hospital, wait outside the Radiology (X-ray) Department on the ground floor of the Main Block. A staff member will meet you there.",
    docsTitle:"Study documents and consent",
    docsText:"Please read the full Participant Information Sheet first. It covers the study purpose, procedures, risks, confidentiality, and arrangements for possible incidental MRI findings.",
    infoBtn:"Read / download information sheet",
    consentText:"You may also review the consent form now. Before taking part, choose whether you wish to be notified about incidental findings, then enter your name, sign and date the form. A clear photo or PDF may be sent to 91230084 by WhatsApp.",
    consentBtn:"Read / download consent form",
    readAck:"I have read the Participant Information Sheet and understand the standby and scan arrangements above",
    formTitle:"Standby details",
    formHelp:"Complete the details below and select every schedule you could attend. Choosing more options makes it easier to match you to a late vacancy.",
    name:"Name",
    phone:"Phone",
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
    scheduleTitle:"4 October schedules you can attend",
    polyu:"PolyU",
    tmh:"Tuen Mun Hospital",
    scanTime:"scan",
    arrive:"recommended arrival",
    order:"Order",
    tFirst:"Tuen Mun Hospital → PolyU",
    pFirst:"PolyU → Tuen Mun Hospital",
    eligibilityAck:"I confirm that the eligibility statements above apply to me and I will only attend after the study team formally confirms my booking.",
    submit:"Submit standby registration",
    submitting:"Submitting…",
    needSlot:"Select at least one schedule you could attend.",
    needRead:"Please read the Participant Information Sheet and tick the acknowledgement first.",
    successTitle:"Standby registration received",
    success1:"Thank you. This is not a confirmed appointment.",
    success2:"If a suitable vacancy becomes available, the study team will contact you by phone or WhatsApp and explicitly confirm both fixed scan times. Do not attend unless you receive that confirmation.",
    already:"This phone number is already on the study list. Please WhatsApp 91230084 if you need to change an arrangement.",
    error:"Unable to submit right now. Please WhatsApp 91230084.",
    open:"View PDF"
  }
};

let lang="zh";
const app=document.querySelector("#app");
const tr=k=>T[lang][k];

function esc(v=""){const x=document.createElement("span");x.textContent=v==null?"":String(v);return x.innerHTML;}
function start(time){const m=String(time).match(/(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null;}
function arrive(time){const m=start(time);if(m==null)return"";const x=(m-30+1440)%1440;return String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0");}
function orderLabel(o){return o==="TMH_FIRST"?tr("tFirst"):tr("pFirst");}

async function api(payload){
  const r=await fetch(ASL_CONFIG.WEB_APP_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
  const j=await r.json();
  if(!j.ok) throw Object.assign(new Error(j.message||"API error"),{code:j.code});
  return j;
}

function translateChrome(){
  document.documentElement.lang=lang==="zh"?"zh-Hant":"en";
  document.querySelector("#page-title").textContent=tr("pageTitle");
  document.querySelector("#footer").textContent=tr("footer");
  document.querySelector("#language").textContent=lang==="zh"?"English":"中文";
}

function linkCard(href,title){
  return `<a class="file-link" href="${href}" target="_blank" rel="noopener"><strong>${title}</strong><span>${tr("open")}</span></a>`;
}

function list(items){return `<ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`;}

function slotCard(s){
  return `
    <label class="choice standby-choice">
      <div class="slot-choice-head">
        <input type="checkbox" name="slot" value="${s.id}">
        <strong>${s.id}</strong>
      </div>
      <div class="slot-site"><b>${tr("tmh")}</b> — ${tr("scanTime")} ${s.tmh} · ${tr("arrive")} ${arrive(s.tmh)}</div>
      <div class="slot-site"><b>${tr("polyu")}</b> — ${tr("scanTime")} ${s.polyu} · ${tr("arrive")} ${arrive(s.polyu)}</div>
      <small>${tr("order")}：${orderLabel(s.order)}</small>
    </label>`;
}

function render(){
  translateChrome();
  app.innerHTML=`
    <section class="study-intro">
      <h2>${tr("introTitle")}</h2>
      ${list(tr("intro"))}
    </section>

    <div class="important">
      <h3>${tr("standbyTitle")}</h3>
      <p class="compact">${tr("standbyText")}</p>
    </div>

    <section class="panel">
      <h3>${tr("eligibilityTitle")}</h3>
      ${list(tr("eligibility"))}
    </section>

    <section class="panel">
      <h3>${tr("procedureTitle")}</h3>
      <div class="notice-list">${tr("notices").map((x,i)=>`<div class="notice done"><strong>${i+1}.</strong> ${x}</div>`).join("")}</div>
    </section>

    <section class="panel">
      <h3>${tr("routeTitle")}</h3>
      <p><strong>${tr("routeContact")}</strong></p>
      <div class="link-grid">
        ${linkCard(FILES.polyuGuide,tr("polyuRoute"))}
        <p class="muted">${tr("polyuNote")}</p>
        ${linkCard(FILES.tmhGuide,tr("tmhRoute"))}
        <p class="muted compact">${tr("tmhNote")}</p>
      </div>
    </section>

    <section class="panel">
      <h3>${tr("docsTitle")}</h3>
      <p>${tr("docsText")}</p>
      ${linkCard(FILES.info,tr("infoBtn"))}
      <p style="margin-top:14px">${tr("consentText")}</p>
      ${linkCard(FILES.consent,tr("consentBtn"))}
      <label class="check-row" style="margin-top:16px">
        <input id="read-info" type="checkbox">
        <span>${tr("readAck")}</span>
      </label>
    </section>

    <form id="standby-form">
      <section class="panel">
        <h3>${tr("formTitle")}</h3>
        <p class="muted">${tr("formHelp")}</p>
        <div class="profile-grid">
          <label>${tr("name")}<input id="name" required></label>
          <label>${tr("phone")}<input id="phone" type="tel" inputmode="tel" required></label>
          <label>${tr("age")}<input id="age" type="number" min="18" max="40" required></label>
          <label>${tr("gender")}
            <select id="gender" required>
              <option value="">${tr("choose")}</option>
              <option value="F">${tr("female")}</option>
              <option value="M">${tr("male")}</option>
              <option value="OTHER">${tr("other")}</option>
            </select>
          </label>
          <label>${tr("height")}<input id="height" type="number" min="100" max="250" step="0.1" required></label>
          <label>${tr("weight")}<input id="weight" type="number" min="20" max="300" step="0.1" required></label>
          <label>${tr("handedness")}
            <select id="handedness" required>
              <option value="">${tr("choose")}</option>
              <option value="R">${tr("right")}</option>
              <option value="L">${tr("left")}</option>
            </select>
          </label>
        </div>
      </section>

      <section class="panel">
        <h3>${tr("scheduleTitle")}</h3>
        <div class="slot-grid standby-grid">${SLOTS.map(slotCard).join("")}</div>
      </section>

      <label class="check-row">
        <input id="eligible" type="checkbox" required>
        <span>${tr("eligibilityAck")}</span>
      </label>

      <div class="actions">
        <button id="submit" type="submit">${tr("submit")}</button>
      </div>
      <p id="status"></p>
    </form>
  `;
  document.querySelector("#standby-form").onsubmit=submit;
}

async function submit(e){
  e.preventDefault();
  const preferences=[...document.querySelectorAll('input[name="slot"]:checked')].map(x=>x.value);
  const readInfo=document.querySelector("#read-info").checked;
  const status=document.querySelector("#status");
  const btn=document.querySelector("#submit");

  if(!readInfo){status.className="error";status.textContent=tr("needRead");return;}
  if(!preferences.length){status.className="error";status.textContent=tr("needSlot");return;}

  btn.disabled=true;btn.textContent=tr("submitting");status.textContent="";
  try{
    await api({
      action:"standbySignup",
      name:document.querySelector("#name").value.trim(),
      phone:document.querySelector("#phone").value.trim(),
      age:document.querySelector("#age").value,
      gender:document.querySelector("#gender").value,
      height:document.querySelector("#height").value,
      weight:document.querySelector("#weight").value,
      handedness:document.querySelector("#handedness").value,
      preferences,
      eligible:document.querySelector("#eligible").checked,
      informationRead:true
    });
    app.innerHTML=`
      <h2 class="success">${tr("successTitle")}</h2>
      <p><strong>${tr("success1")}</strong></p>
      <p>${tr("success2")}</p>
      <div class="important">91230084 · <a href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp</a></div>
    `;
  }catch(err){
    btn.disabled=false;btn.textContent=tr("submit");status.className="error";
    status.textContent=err.code==="ALREADY_REGISTERED"?tr("already"):tr("error");
  }
}

document.querySelector("#language").onclick=()=>{lang=lang==="zh"?"en":"zh";render();};
render();