const FILES = {
  info:"assets/participant-information-sheet.pdf",
  consent:"assets/consent-form.pdf",
  polyuGuide:"assets/polyu-to-ubsn.pdf",
  tmhGuide:"assets/polyu-to-tmh.pdf"
};

const PLAN = {
  N1:{
    polyuTime:"2026-11-01 09:00–09:30",
    tmhTime:"2026-11-01 11:00–11:30",
    order:"POLYU_FIRST"
  },
  N2:{
    polyuTime:"2026-11-01 09:30–10:00",
    tmhTime:"2026-11-01 11:30–12:00",
    order:"POLYU_FIRST"
  },
  N3:{
    polyuTime:"2026-11-01 12:00–12:30",
    tmhTime:"2026-11-01 14:00–14:30",
    order:"POLYU_FIRST"
  }
};

const NOTICES = {
  zh:[
    "你需要在<strong>同一天</strong>完成香港理工大學及屯門醫院兩次 MRI 掃描。",
    "目前提供的是<strong>2026 年 11 月 1 日</strong>的固定配對時段；只會顯示仍有空缺的安排。",
    "兩個地點都建議在<strong>掃描時間前約 30 分鐘到達</strong>。",
    "掃描前請保持<strong>至少 2 小時未進食</strong>。",
    "掃描當天<strong>請勿吸煙、飲酒、飲用咖啡或茶</strong>，並避免能量飲品及其他含咖啡因產品。",
    "掃描前一晚<strong>請勿熬夜</strong>，並保持充足睡眠。",
    "掃描前請避免劇烈運動及強烈情緒激動。",
    "掃描前 3 天請盡量避免不必要的藥物。如因醫療需要必須服藥，請按醫生指示正常服用，<strong>不要自行停藥</strong>，並告知研究團隊藥物名稱及劑量。",
    "香港理工大學與屯門醫院之間請預留約 <strong>1–1.5 小時</strong>公共交通時間。",
    "到達香港理工大學或屯門醫院後，請直接<strong>致電或 WhatsApp 91230084</strong>。屯門醫院請在主座地下放射科（X光部門）門口等候工作人員。",
    "完成兩次掃描後可獲 <strong>HK$200</strong> 研究參與津貼；津貼只發放一次。"
  ],
  en:[
    "Both MRI scans must be completed on the <strong>same day</strong>.",
    "The currently offered fixed paired slots are on <strong>1 November 2026</strong>. Only arrangements that are still available will be shown.",
    "Please arrive about <strong>30 minutes before each scan</strong>.",
    "Do not eat for at least <strong>2 hours</strong> before scanning.",
    "On the scan day, <strong>do not smoke or drink alcohol, coffee or tea</strong>, and avoid energy drinks and other caffeinated products.",
    "Do not stay up late the night before; get sufficient sleep.",
    "Avoid strenuous exercise and strong emotional excitement before scanning.",
    "Avoid unnecessary medication for 3 days where possible. Take medically necessary medication as directed and do not stop prescribed medication on your own. Tell the study team the name and dose.",
    "Allow approximately <strong>1–1.5 hours</strong> for public transport between PolyU and Tuen Mun Hospital.",
    "On arrival at either site, <strong>call or WhatsApp 91230084</strong>. At Tuen Mun Hospital, wait outside Radiology (X-ray) on the ground floor of the Main Block.",
    "After completing both scans, you will receive one <strong>HK$200</strong> study participation incentive."
  ]
};

const T = {
  zh:{
    title:"ASL 研究掃描預約",
    footer:"不同場強下動脈自旋標記成像一致性研究",
    step:"步驟",
    phoneTitle:"輸入聯絡電話",
    phoneHelp:"請使用研究登記時提供的電話號碼。",
    phone:"電話號碼",
    continue:"繼續",
    finding:"正在查找…",
    notFound:"找不到這個電話號碼，請確認後再試。",
    error:"暫時無法連接系統，請稍後再試。",
    participantInfo:"參加者資料",
    name:"姓名",
    gender:"性別",
    age:"年齡",
    male:"男",
    female:"女",
    other:"其他",
    profileTitle:"補充資料",
    profileHelp:"請確認身高、體重及慣用手。這些資料會用於屯門醫院登記。",
    height:"身高（cm）",
    weight:"體重（kg）",
    handedness:"慣用手",
    right:"右手",
    left:"左手",
    saveContinue:"儲存並繼續",
    saving:"儲存中…",
    notices:"請逐項閱讀",
    understand:"我知道了",
    understood:"已明白 ✓",
    choose:"選擇 11 月 1 日掃描安排",
    chooseHelp:"只顯示目前仍有空缺的時段；如果都不方便，可以直接選擇「以上時段都不方便」。",
    unavailableChoice:"以上時段都不方便",
    unavailableHelp:"不建立預約；只記錄這個選擇。",
    submitChoice:"確認選擇",
    back:"返回",
    needChoice:"請先選擇一項。",
    processing:"正在處理…",
    bookedTitle:"預約成功",
    bookedWarning:"你的 11 月 1 日掃描時間已正式確認。",
    waitlistTitle:"目前 11 月 1 日空缺已被選走",
    waitlistBody:"你仍保留在候補名單中；如 11 月 1 日再出現合適空缺，研究團隊會聯絡你。未收到確認前請勿自行前往。",
    raceWaitlistTitle:"已加入該時段候補",
    raceWaitlistBody:"你剛選擇的時段已被其他參加者先一步確認。你已保留在該時段候補名單中；如有空缺，研究團隊會聯絡你。",
    unavailableTitle:"已記錄",
    unavailableBody:"已記錄 11 月 1 日目前提供的時段都不方便，不會為你建立預約。",
    order:"掃描順序",
    polyu:"香港理工大學 UBSN",
    tmh:"屯門醫院",
    scanTime:"掃描時間",
    arrival:"建議到達",
    contact:"到達後請直接致電或 WhatsApp 91230084 聯絡研究團隊。",
    polyuSignal:"ZB217 位於 LG2，手機訊號可能較弱；建議乘升降機到 LG2 前先聯絡我們。",
    tmhMeet:"到達屯門醫院後，請到主座地下放射科（X光部門）門口等候，工作人員會前往接你。",
    routes:"路線指引",
    polyuRoute:"前往 PolyU UBSN / ZB217",
    tmhRoute:"PolyU → 屯門醫院",
    preparation:"掃描前準備",
    prep:[
      "掃描前至少 2 小時不要進食。",
      "掃描當天不要吸煙、飲酒、飲用咖啡、茶、能量飲品或其他含咖啡因產品。",
      "前一晚不要熬夜，保持充足睡眠。",
      "掃描前避免劇烈運動及強烈情緒激動。",
      "必要藥物請按醫生指示正常服用，不要自行停藥；並告知研究團隊藥物名稱及劑量。",
      "兩個地點均建議提前約 30 分鐘到達。"
    ],
    incentive:"研究參與津貼",
    incentiveText:"完成兩次掃描後可獲 HK$200，津貼只發放一次。",
    docs:"研究文件及同意書",
    docsSend:"請閱讀參加者須知，填妥同意書（包括意外發現通知選項、姓名、簽署及日期），完成後將清晰照片或 PDF 透過 WhatsApp 發送至 91230084。",
    qr:"PolyU 校園入場二維碼",
    qrSave:"查看／儲存二維碼",
    completed:"你已完成本研究，謝謝參與。"
  },
  en:{
    title:"ASL Study Scan Booking",
    footer:"Consistency of arterial spin labelling imaging across field strengths",
    step:"Step",
    phoneTitle:"Enter your contact number",
    phoneHelp:"Use the phone number provided during study registration.",
    phone:"Phone number",
    continue:"Continue",
    finding:"Looking up…",
    notFound:"We could not find that phone number.",
    error:"The service is temporarily unavailable. Please try again later.",
    participantInfo:"Participant details",
    name:"Name",
    gender:"Sex",
    age:"Age",
    male:"Male",
    female:"Female",
    other:"Other",
    profileTitle:"Additional information",
    profileHelp:"Please confirm your height, weight and handedness for Tuen Mun Hospital registration.",
    height:"Height (cm)",
    weight:"Weight (kg)",
    handedness:"Handedness",
    right:"Right",
    left:"Left",
    saveContinue:"Save and continue",
    saving:"Saving…",
    notices:"Please read each item",
    understand:"I understand",
    understood:"Understood ✓",
    choose:"Choose a 1 November scan arrangement",
    chooseHelp:"Only currently available slots are shown. If none work for you, choose “None of these times work”.",
    unavailableChoice:"None of these times work",
    unavailableHelp:"No booking will be created; we will only record this choice.",
    submitChoice:"Confirm choice",
    back:"Back",
    needChoice:"Please choose an option first.",
    processing:"Processing…",
    bookedTitle:"Booking confirmed",
    bookedWarning:"Your scan times for 1 November are confirmed.",
    waitlistTitle:"The current 1 November openings have been taken",
    waitlistBody:"You remain on the waitlist. If a suitable opening becomes available on 1 November, the study team will contact you. Please do not attend unless contacted.",
    raceWaitlistTitle:"Added to the waitlist for that slot",
    raceWaitlistBody:"The slot you selected was confirmed by another participant just before you. You remain on the waitlist for that slot and the study team will contact you if it becomes available.",
    unavailableTitle:"Preference recorded",
    unavailableBody:"We recorded that the currently offered 1 November times do not work for you. No booking has been created.",
    order:"Scan order",
    polyu:"PolyU UBSN",
    tmh:"Tuen Mun Hospital",
    scanTime:"Scan time",
    arrival:"Recommended arrival",
    contact:"On arrival, call or WhatsApp 91230084.",
    polyuSignal:"ZB217 is on LG2 and mobile signal may be weak. Contact us before taking the lift down to LG2.",
    tmhMeet:"At Tuen Mun Hospital, wait outside Radiology (X-ray) on the ground floor of the Main Block. A staff member will meet you there.",
    routes:"Directions",
    polyuRoute:"Getting to PolyU UBSN / ZB217",
    tmhRoute:"PolyU → Tuen Mun Hospital",
    preparation:"Before your scans",
    prep:[
      "Do not eat for at least 2 hours before scanning.",
      "Do not smoke, drink alcohol, coffee, tea, energy drinks or other caffeinated products on the scan day.",
      "Do not stay up late; get sufficient sleep.",
      "Avoid strenuous exercise and strong emotional excitement.",
      "Take medically necessary medication as directed; do not stop it on your own. Tell the study team the name and dose.",
      "Please arrive about 30 minutes early at both locations."
    ],
    incentive:"Study participation incentive",
    incentiveText:"You will receive HK$200 after completing both scans. It is paid once.",
    docs:"Study documents and consent",
    docsSend:"Please read the Participant Information Sheet, complete the consent form including the incidental-finding notification choice, name, signature and date, then send a clear photo or PDF by WhatsApp to 91230084.",
    qr:"PolyU campus entry QR code",
    qrSave:"View / save QR code",
    completed:"You have completed the study. Thank you."
  }
};

const state = {
  lang:"zh",
  step:"phone",
  phone:"",
  participant:null,
  noticesDone:0,
  choice:"",
  openSlots:[]
};

const app = document.querySelector("#app");
const tr = key => T[state.lang][key];

function esc(value="") {
  const el=document.createElement("span");
  el.textContent=value==null?"":String(value);
  return el.innerHTML;
}

function setProgress(n) {
  document.querySelector("#progress").textContent=n?`${tr("step")} ${n} / 5`:"";
}

function translatePage() {
  document.documentElement.lang=state.lang==="zh"?"zh-Hant":"en";
  document.querySelectorAll("[data-text]").forEach(el=>el.textContent=tr(el.dataset.text));
  document.querySelector("#language").textContent=state.lang==="zh"?"English":"中文";
}

function splitSlot(value) {
  const text=String(value||"").trim();
  const i=text.indexOf(" ");
  return i<0?{date:"",time:text}:{date:text.slice(0,i),time:text.slice(i+1)};
}

function dateLabel(value) {
  const d=splitSlot(value).date;
  return d==="2026-11-01"
    ?(state.lang==="zh"?"2026 年 11 月 1 日":"1 November 2026")
    :d;
}

function arrivalTime(value) {
  const m=splitSlot(value).time.match(/(\d{1,2}):(\d{2})/);
  if(!m) return "";
  const t=(Number(m[1])*60+Number(m[2])-30+1440)%1440;
  return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0");
}

function orderLabel(order) {
  if(state.lang==="zh") {
    return order==="POLYU_FIRST"?"香港理工大學 → 屯門醫院":"屯門醫院 → 香港理工大學";
  }
  return order==="POLYU_FIRST"?"PolyU → Tuen Mun Hospital":"Tuen Mun Hospital → PolyU";
}

function genderLabel(gender) {
  const value=String(gender||"").trim().toUpperCase();
  if(value==="M") return tr("male");
  if(value==="F") return tr("female");
  return tr("other");
}

function participantSummary() {
  const p=state.participant;
  return `<div class="summary">
    <div><strong>${tr("name")}</strong><br>${esc(p.name)}</div>
    <div><strong>${tr("gender")}</strong><br>${esc(genderLabel(p.gender))}</div>
    <div><strong>${tr("age")}</strong><br>${esc(p.age||"—")}</div>
    <div><strong>${tr("phone")}</strong><br>${esc(p.phone||state.phone)}</div>
  </div>`;
}

async function api(payload) {
  const response=await fetch(ASL_CONFIG.WEB_APP_URL,{
    method:"POST",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(payload)
  });

  const result=await response.json();

  if(!result.ok) {
    throw Object.assign(new Error(result.message||"API error"),{code:result.code});
  }

  return result;
}

function renderPhone(error="") {
  state.step="phone";
  setProgress(1);

  app.innerHTML=`
    <h2>${tr("phoneTitle")}</h2>
    <p class="muted">${tr("phoneHelp")}</p>
    ${error?`<p class="error">${esc(error)}</p>`:""}
    <form id="phone-form">
      <label>${tr("phone")}</label>
      <div class="phone">
        <select id="country">
          <option value="+852">+852 Hong Kong</option>
          <option value="+86">+86 Mainland China</option>
        </select>
        <input id="phone" type="tel" inputmode="tel" autocomplete="tel" required>
      </div>
      <button type="submit">${tr("continue")}</button>
    </form>`;

  document.querySelector("#phone-form").onsubmit=lookup;
}

async function lookup(event) {
  event.preventDefault();

  const button=event.currentTarget.querySelector("button");
  button.disabled=true;
  button.textContent=tr("finding");

  state.phone=document.querySelector("#country").value+
    document.querySelector("#phone").value.replace(/\s+/g,"");

  try {
    const result=await api({action:"lookup",phone:state.phone});
    state.participant=result.participant;
    if(!Array.isArray(result.openSlots)){
      renderBackendMismatch();
      return;
    }
    state.openSlots=result.openSlots;
    state.choice="";

    if(state.participant.status==="COMPLETED") {
      state.step="completed";
      setProgress(1);
      app.innerHTML=`<h2>${esc(state.participant.name)}</h2><div class="important">${tr("completed")}</div>`;
      return;
    }

    if(state.participant.appointment) {
      renderBookedResult(state.participant.appointment);
      return;
    }

    if(String(state.participant.waitlistPreference||"").startsWith("NONE: 2026-11-01")) {
      renderUnavailable();
      return;
    }

    if(state.openSlots.length===0) {
      renderWaitlist(null,false);
      return;
    }

    renderProfile();
  } catch(err) {
    renderPhone(err.code==="NOT_FOUND"?tr("notFound"):tr("error"));
  }
}

function renderBackendMismatch(){
  state.step="backendMismatch";
  setProgress(1);
  app.innerHTML=`
    <h2>${state.lang==="zh"?"系統暫時無法確認預約空位":"Booking availability cannot be verified"}</h2>
    <div class="important">${state.lang==="zh"
      ?"預約資料尚未與最新系統同步。這不代表時段已滿；請稍後再試或聯絡研究團隊。"
      :"The booking page is not receiving current availability data. This does not mean that the slots are full. Please try again later or contact the study team."}</div>
    <div class="actions"><a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a></div>`;
}

function renderProfile(message="") {
  state.step="profile";
  setProgress(2);
  const p=state.participant;

  app.innerHTML=`
    <h2>${tr("participantInfo")}</h2>
    ${participantSummary()}

    <section class="panel">
      <h3>${tr("profileTitle")}</h3>
      <p class="muted">${tr("profileHelp")}</p>
      ${message?`<p class="error">${esc(message)}</p>`:""}

      <form id="profile-form" class="profile-grid">
        <label>${tr("height")}
          <input id="height" type="number" min="100" max="250" step="0.1" value="${esc(p.height||"")}" required>
        </label>

        <label>${tr("weight")}
          <input id="weight" type="number" min="20" max="300" step="0.1" value="${esc(p.weight||"")}" required>
        </label>

        <label>${tr("handedness")}
          <select id="handedness" required>
            <option value=""></option>
            <option value="R" ${p.handedness==="R"?"selected":""}>${tr("right")}</option>
            <option value="L" ${p.handedness==="L"?"selected":""}>${tr("left")}</option>
          </select>
        </label>

        <button id="profile-save" type="submit">${tr("saveContinue")}</button>
      </form>
    </section>`;

  document.querySelector("#profile-form").onsubmit=saveProfileAndContinue;
}

async function saveProfileAndContinue(event) {
  event.preventDefault();

  const button=document.querySelector("#profile-save");
  button.disabled=true;
  button.textContent=tr("saving");

  try {
    const result=await api({
      action:"updateProfile",
      phone:state.phone,
      height:document.querySelector("#height").value,
      weight:document.querySelector("#weight").value,
      handedness:document.querySelector("#handedness").value
    });

    state.participant.height=result.height;
    state.participant.weight=result.weight;
    state.participant.handedness=result.handedness;
    state.noticesDone=0;
    renderNotices();
  } catch(err) {
    renderProfile(err.message||tr("error"));
  }
}

function renderNotices() {
  state.step="notices";
  setProgress(3);

  app.innerHTML=`
    ${participantSummary()}
    <h2 style="margin-top:22px">${tr("notices")}</h2>
    <div id="notices"></div>`;

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
      </div>`);
  });

  if(state.noticesDone===NOTICES[state.lang].length) {
    list.insertAdjacentHTML("beforeend",`
      <div class="actions">
        <button id="to-choices" type="button">${tr("continue")}</button>
      </div>`);
  }

  list.onclick=event=>{
    const button=event.target.closest("button[data-notice]");
    if(!button||button.disabled) return;
    state.noticesDone++;
    renderNotices();
  };

  document.querySelector("#to-choices")?.addEventListener("click",()=>renderChoices());
}

function choiceButtons() {
  const slots=state.openSlots
    .filter(id=>PLAN[id])
    .map(id=>{
      const p=PLAN[id];
      return `
        <button class="choice paired-choice ${state.choice===id?"selected":""}" type="button" data-choice="${id}">
          <strong>${orderLabel(p.order)}</strong>
          <span>理工 ${esc(splitSlot(p.polyuTime).time)}　→　屯門 ${esc(splitSlot(p.tmhTime).time)}</span>
        </button>`;
    })
    .join("");

  return `
    ${slots}
    <button class="choice paired-choice ${state.choice==="NONE"?"selected":""}" type="button" data-choice="NONE">
      <strong>${tr("unavailableChoice")}</strong>
      <span>${tr("unavailableHelp")}</span>
    </button>`;
}

function renderChoices(message="") {
  state.step="choices";
  setProgress(4);

  app.innerHTML=`
    <h2>${tr("choose")}</h2>
    <p class="muted">${tr("chooseHelp")}</p>
    ${message?`<p class="error">${esc(message)}</p>`:""}
    <div class="paired-choice-list">${choiceButtons()}</div>
    <div class="actions">
      <button class="secondary" id="back" type="button">${tr("back")}</button>
      <button id="submit-choice" type="button">${tr("submitChoice")}</button>
    </div>`;

  app.querySelectorAll("[data-choice]").forEach(button=>{
    button.onclick=()=>{
      state.choice=button.dataset.choice;
      renderChoices();
    };
  });

  document.querySelector("#back").onclick=()=>renderNotices();
  document.querySelector("#submit-choice").onclick=submitChoice;
}

async function submitChoice(event) {
  if(!state.choice) {
    renderChoices(tr("needChoice"));
    return;
  }

  event.currentTarget.disabled=true;
  event.currentTarget.textContent=tr("processing");

  try {
    if(state.choice==="NONE") {
      const result=await api({
        action:"recordPreference",
        phone:state.phone,
        preference:"NONE"
      });

      if(result.booked&&result.appointment) {
        state.participant.status="BOOKED";
        state.participant.appointment=result.appointment;
        renderBookedResult(result.appointment);
        return;
      }

      state.participant.status="";
      state.participant.waitlistPreference=result.preference||"";
      renderUnavailable();
      return;
    }

    const selected=state.choice;
    const result=await api({
      action:"bookReplacement",
      phone:state.phone,
      slotId:selected,
      acknowledged:true
    });

    if(result.waitlisted) {
      state.participant.status="WAITLIST";
      state.participant.waitlistPreference=result.preference;
      renderWaitlist(PLAN[selected],true);
      return;
    }

    state.participant.status="BOOKED";
    state.participant.appointment=result.appointment;
    renderBookedResult(result.appointment);
  } catch(err) {
    renderChoices(err.message||tr("error"));
  }
}

function renderWaitlist(plan,race) {
  state.step="waitlist";
  setProgress(5);

  app.innerHTML=`
    <h2>${race?tr("raceWaitlistTitle"):tr("waitlistTitle")}</h2>
    <div class="important">
      <strong>${race?tr("raceWaitlistBody"):tr("waitlistBody")}</strong>
    </div>

    ${plan?`
      <div class="appointment">
        <strong>${orderLabel(plan.order)}</strong>
        <p>理工 ${esc(splitSlot(plan.polyuTime).time)} → 屯門 ${esc(splitSlot(plan.tmhTime).time)}</p>
      </div>`:""}

    <div class="actions">
      <a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a>
    </div>`;
}

function renderUnavailable() {
  state.step="unavailable";
  setProgress(5);

  app.innerHTML=`
    <h2>${tr("unavailableTitle")}</h2>
    <div class="important"><strong>${tr("unavailableBody")}</strong></div>
    <div class="actions">
      <a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a>
    </div>`;
}

function resultCard(site,value,note,cls) {
  return `
    <div class="appointment ${cls}">
      <span>${site}：${tr("scanTime")}</span>
      <strong>${dateLabel(value)}<br>${esc(splitSlot(value).time)}</strong>
      <small><strong>${tr("arrival")}：${esc(arrivalTime(value))}</strong></small>
      <p class="muted compact">${note}</p>
    </div>`;
}

function renderBookedResult(a) {
  state.step="booked";
  setProgress(5);

  const cards=
    resultCard(tr("polyu"),a.polyuTime,tr("polyuSignal"),"fixed")+
    resultCard(tr("tmh"),a.tmhTime,tr("tmhMeet"),"hospital");

  app.innerHTML=`
    <h2 class="success">${tr("bookedTitle")}</h2>
    <div class="important"><strong>${tr("bookedWarning")}</strong></div>

    ${participantSummary()}

    <div class="summary">
      <div><strong>${tr("order")}</strong><br>${orderLabel(a.order)}</div>
    </div>

    ${cards}

    <address>
      <strong>${tr("polyu")}</strong><br>
      Z座地下二樓 ZB217<br>
      UBSN 神經科學實驗室<br>
      ${tr("contact")}
    </address>

    <address>
      <strong>${tr("tmh")}</strong><br>
      主座地下放射科（X光部門）<br>
      新界屯門青松觀路23號<br>
      ${tr("contact")}
    </address>

    <section class="panel">
      <h3>${tr("routes")}</h3>
      <div class="actions">
        <a class="button-link" href="${FILES.polyuGuide}" target="_blank" rel="noopener">${tr("polyuRoute")}</a>
        <a class="button-link" href="${FILES.tmhGuide}" target="_blank" rel="noopener">${tr("tmhRoute")}</a>
      </div>
    </section>

    <section class="preparation">
      <h3>${tr("preparation")}</h3>
      <ul>${tr("prep").map(x=>`<li>${x}</li>`).join("")}</ul>
    </section>

    <section class="incentive">
      <h3>${tr("incentive")}</h3>
      <p><strong>${tr("incentiveText")}</strong></p>
    </section>

    ${a.qr?`
      <div class="qr">
        <h3>${tr("qr")}</h3>
        <img src="${esc(a.qr)}" alt="Campus entry QR code">
        <a class="button-link" href="${esc(a.qr)}" target="_blank" rel="noopener">${tr("qrSave")}</a>
      </div>`:""}

    <section class="panel">
      <h3>${tr("docs")}</h3>
      <p>${tr("docsSend")}</p>
      <div class="actions">
        <a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">${state.lang==="zh"?"參加者須知":"Information sheet"}</a>
        <a class="button-link" href="${FILES.consent}" target="_blank" rel="noopener">${state.lang==="zh"?"同意書":"Consent form"}</a>
        <a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a>
      </div>
    </section>`;
}

document.addEventListener("keydown",event=>{
  if(event.key!=="Enter"||state.step!=="notices") return;

  const tag=(event.target&&event.target.tagName||"").toUpperCase();
  if(["A","INPUT","SELECT","TEXTAREA"].includes(tag)) return;

  const next=document.querySelector('#notices button[data-notice]:not([disabled])');
  const cont=document.querySelector("#to-choices");

  if(next) {
    event.preventDefault();
    next.click();
  } else if(cont) {
    event.preventDefault();
    cont.click();
  }
});

document.querySelector("#language").onclick=()=>{
  state.lang=state.lang==="zh"?"en":"zh";
  translatePage();

  const renderers={
    phone:()=>renderPhone(),
    profile:()=>renderProfile(),
    notices:()=>renderNotices(),
    choices:()=>renderChoices(),
    backendMismatch:()=>renderBackendMismatch(),
    waitlist:()=>renderWaitlist(null,false),
    unavailable:()=>renderUnavailable(),
    booked:()=>renderBookedResult(state.participant.appointment)
  };

  if(renderers[state.step]) {
    renderers[state.step]();
  }
};

translatePage();
renderPhone();

// Continue registration for participants arriving from the original portal.
let bookingPhone="";
try{
  bookingPhone=sessionStorage.getItem("aslBookingPhone")||"";
  sessionStorage.removeItem("aslBookingPhone");
}catch{}
if(/^\+852\d{8}$/.test(bookingPhone)||/^\+86\d{11}$/.test(bookingPhone)){
  const country=bookingPhone.startsWith("+852")?"+852":"+86";
  document.querySelector("#country").value=country;
  document.querySelector("#phone").value=bookingPhone.slice(country.length);
  lookup({preventDefault(){},currentTarget:document.querySelector("#phone-form")});
}

