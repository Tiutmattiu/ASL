const INCENTIVE_AMOUNT = 200;

const FILES = {
  info:"assets/participant-information-sheet.pdf",
  consent:"assets/consent-form.pdf",
  polyuGuide:"assets/polyu-to-ubsn.pdf",
  tmhGuide:"assets/polyu-to-tmh.pdf"
};

const PLAN = {
  B:{
    polyuTime:"2026-10-04 13:00–13:30",
    tmhTime:"2026-10-04 15:00–15:30",
    order:"POLYU_FIRST",
    qr:"https://drive.google.com/thumbnail?id=1Lid_keX_jGDryzDUmKMq2fw080LTRPzP&sz=w1000"
  },
  D:{
    polyuTime:"2026-10-04 16:30–17:00",
    tmhTime:"2026-10-04 13:30–14:00",
    order:"TMH_FIRST",
    qr:"https://drive.google.com/thumbnail?id=1PnPcDVYIQP_XFe8enpLHE9VVUjXLoZOX&sz=w1000"
  }
};

const NOTICES = {
  zh:[
    `請先閱讀完整的<strong>《參加者須知》</strong>，並閱讀同意書。<br><br><strong>MRI 意外發現是什麼？</strong><br>MRI 意外發現是指研究掃描中偶然發現可能需要進一步醫療評估的異常，例如疑似<strong>腦出血、中風、腫瘤</strong>或其他明顯異常。研究 MRI 並不是正式的臨床診斷檢查，也不會提供常規影像報告。<br><br>如果你勾選<strong>「希望得到通知」</strong>：若研究人員在影像中發現可能具有臨床意義的異常，我們會在發現後聯絡你。<br><br>如果你勾選<strong>「不希望得到通知」</strong>：即使研究影像中發現可能的異常，我們也不會因本研究的影像結果主動通知你。<br><br>如果正式確認參加，請在同意書中選擇其中一項，並填寫姓名、簽署及日期。<div class="actions"><a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">參加者須知</a><a class="button-link" href="${FILES.consent}" target="_blank" rel="noopener">同意書</a></div>`,
    "你需要在<strong>同一天</strong>完成香港理工大學及屯門醫院兩次 MRI 掃描。",
    "兩個地點的<strong>掃描時間均為固定時間</strong>；請從提供的固定配對安排中選擇一個。",
    "兩個地點都建議在<strong>掃描時間前約 30 分鐘到達</strong>。",
    "掃描前請保持<strong>至少 2 小時未進食</strong>。",
    "掃描當天<strong>請勿吸煙、飲酒、飲用咖啡或茶</strong>，並避免能量飲品及其他含咖啡因產品。",
    "掃描前一晚<strong>請勿熬夜</strong>，並保持充足睡眠。",
    "掃描前請避免劇烈運動及強烈情緒激動。",
    "掃描前 3 天請盡量避免不必要的藥物。如因醫療需要必須服藥，請按醫生指示正常服用，<strong>不要自行停藥</strong>，並告知研究團隊藥物名稱及劑量。",
    "香港理工大學與屯門醫院之間請預留約 <strong>1–1.5 小時</strong>公共交通時間。",
    "到達香港理工大學或屯門醫院後，請直接<strong>致電或 WhatsApp 91230084</strong>。屯門醫院請在主座地下放射科（X光部門）門口等候工作人員。",
    `完成兩次掃描後可獲 <strong>HK$${INCENTIVE_AMOUNT}</strong> 研究參與津貼；津貼只發放一次。`
  ],
  en:[
    `Please read the full <strong>Participant Information Sheet</strong> and the consent form.<br><br><strong>What is an incidental MRI finding?</strong><br>This is an unexpected abnormality seen during the research scan that may need further medical assessment, for example suspected <strong>brain haemorrhage, stroke, tumour</strong>, or another obvious abnormality. Research MRI is not a formal clinical diagnostic examination and does not provide a routine radiology report.<br><br>If you choose <strong>“I wish to be notified”</strong>, we will contact you if a potentially clinically significant abnormality is identified. If you choose <strong>“I do not wish to be notified”</strong>, we will not proactively notify you on the basis of the research images even if a possible abnormality is seen.<div class="actions"><a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">Information sheet</a><a class="button-link" href="${FILES.consent}" target="_blank" rel="noopener">Consent form</a></div>`,
    "Both MRI scans must be completed on the <strong>same day</strong>.",
    "The scan times at <strong>both sites are fixed</strong>. Choose one of the paired arrangements below.",
    "Please arrive about <strong>30 minutes before each scan</strong>.",
    "Do not eat for at least <strong>2 hours</strong> before scanning.",
    "On the scan day, <strong>do not smoke or drink alcohol, coffee or tea</strong>, and avoid energy drinks and other caffeinated products.",
    "Do not stay up late the night before; get sufficient sleep.",
    "Avoid strenuous exercise and strong emotional excitement before scanning.",
    "Avoid unnecessary medication for 3 days where possible. Take medically necessary medication as directed and do not stop prescribed medication on your own. Tell the study team the name and dose.",
    "Allow approximately <strong>1–1.5 hours</strong> for public transport between PolyU and Tuen Mun Hospital.",
    "On arrival at either site, <strong>call or WhatsApp 91230084</strong>. At Tuen Mun Hospital, wait outside Radiology (X-ray) on the ground floor of the Main Block.",
    `After completing both scans, you will receive one <strong>HK$${INCENTIVE_AMOUNT}</strong> study participation incentive.`
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
    participant:"參加者",
    notices:"請逐項閱讀",
    understand:"我知道了",
    understood:"已明白 ✓",
    choose:"選擇一個掃描安排",
    chooseHelp:"以下兩個安排均為固定配對。搶到即為正式預約；若該安排已被其他參加者預約，系統會將你加入候補名單。",
    back:"返回",
    book:"確認預約",
    booking:"正在處理…",
    needChoice:"請先選擇一個安排。",
    bookedTitle:"預約成功",
    bookedWarning:"你的掃描時間已正式確認。",
    waitlistTitle:"已加入候補名單",
    waitlistBody:"你選擇的安排已被其他參加者預約。你已加入該安排的候補名單；如有空缺，研究團隊會聯絡你。請勿自行前往。",
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
    docs:"研究文件",
    qr:"PolyU 校園入場二維碼",
    qrSave:"查看／儲存二維碼",
    alreadyBooked:"你已經有正式掃描預約。",
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
    participant:"Participant",
    notices:"Please read each item",
    understand:"I understand",
    understood:"Understood ✓",
    choose:"Choose one scan arrangement",
    chooseHelp:"Both options are fixed paired arrangements. If the arrangement is available, your booking is confirmed immediately. If it has already been booked, you will be added to the waitlist.",
    back:"Back",
    book:"Confirm booking",
    booking:"Processing…",
    needChoice:"Please choose an arrangement first.",
    bookedTitle:"Booking confirmed",
    bookedWarning:"Your scan times are confirmed.",
    waitlistTitle:"Added to the waitlist",
    waitlistBody:"The arrangement you selected has already been booked. You have been added to its waitlist. The study team will contact you if it becomes available. Please do not attend unless contacted.",
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
    docs:"Study documents",
    qr:"PolyU campus entry QR code",
    qrSave:"View / save QR code",
    alreadyBooked:"You already have a confirmed scan booking.",
    completed:"You have completed the study. Thank you."
  }
};

const state = {lang:"zh",step:"phone",phone:"",participant:null,noticesDone:0,slotId:""};
const app = document.querySelector("#app");
const tr = key => T[state.lang][key];

function esc(value=""){
  const el=document.createElement("span");
  el.textContent=value==null?"":String(value);
  return el.innerHTML;
}

function setProgress(n){
  document.querySelector("#progress").textContent=n ? `${tr("step")} ${n} / 4` : "";
}

function translatePage(){
  document.documentElement.lang=state.lang==="zh"?"zh-Hant":"en";
  document.querySelectorAll("[data-text]").forEach(el=>el.textContent=tr(el.dataset.text));
  document.querySelector("#language").textContent=state.lang==="zh"?"English":"中文";
}

function splitSlot(value){
  const text=String(value||"").trim();
  const i=text.indexOf(" ");
  return i<0?{date:"",time:text}:{date:text.slice(0,i),time:text.slice(i+1)};
}

function dateLabel(value){
  const d=splitSlot(value).date;
  if(d==="2026-10-04") return state.lang==="zh"?"2026 年 10 月 4 日":"4 October 2026";
  return d;
}

function arrivalTime(value){
  const m=splitSlot(value).time.match(/(\d{1,2}):(\d{2})/);
  if(!m) return "";
  const total=(Number(m[1])*60+Number(m[2])-30+1440)%1440;
  return String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");
}

function orderLabel(order){
  if(state.lang==="zh") return order==="POLYU_FIRST"?"香港理工大學 → 屯門醫院":"屯門醫院 → 香港理工大學";
  return order==="POLYU_FIRST"?"PolyU → Tuen Mun Hospital":"Tuen Mun Hospital → PolyU";
}

function planFromPreference(pref){
  const id=String(pref||"").split(":")[0].trim();
  return PLAN[id] ? {id,...PLAN[id]} : null;
}

async function api(payload){
  const response=await fetch(ASL_CONFIG.WEB_APP_URL,{
    method:"POST",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(payload)
  });
  const result=await response.json();
  if(!result.ok) throw Object.assign(new Error(result.message||"API error"),{code:result.code});
  return result;
}

function renderPhone(error=""){
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

async function lookup(e){
  e.preventDefault();
  const btn=e.currentTarget.querySelector("button");
  btn.disabled=true;
  btn.textContent=tr("finding");
  state.phone=document.querySelector("#country").value+document.querySelector("#phone").value.replace(/\s+/g,"");

  try{
    const result=await api({action:"lookup",phone:state.phone});
    state.participant=result.participant;

    if(state.participant.status==="COMPLETED"){
      setProgress(1);
      app.innerHTML=`<h2>${esc(state.participant.name)}</h2><div class="important">${tr("completed")}</div>`;
      return;
    }

    if(state.participant.appointment){
      renderBookedResult(state.participant.appointment);
      return;
    }

    if(state.participant.status==="WAITLIST" && state.participant.waitlistPreference){
      renderWaitlist(planFromPreference(state.participant.waitlistPreference));
      return;
    }

    state.noticesDone=0;
    renderNotices();
  }catch(err){
    renderPhone(err.code==="NOT_FOUND"?tr("notFound"):tr("error"));
  }
}

function renderNotices(){
  state.step="notices";
  setProgress(2);
  app.innerHTML=`
    <div class="summary">
      <div><strong>${tr("participant")}</strong><br>${esc(state.participant.name)}</div>
    </div>
    <h2 style="margin-top:22px">${tr("notices")}</h2>
    <div id="notices"></div>`;

  const list=document.querySelector("#notices");
  NOTICES[state.lang].forEach((text,index)=>{
    const done=index<state.noticesDone;
    const unlocked=index<=state.noticesDone;
    list.insertAdjacentHTML("beforeend",`
      <div class="notice ${done?"done":unlocked?"":"locked"}">
        <p>${text}</p>
        <button type="button" data-notice="${index}" ${unlocked&&!done?"":"disabled"}>${done?tr("understood"):tr("understand")}</button>
      </div>`);
  });

  if(state.noticesDone===NOTICES[state.lang].length){
    list.insertAdjacentHTML("beforeend",`<div class="actions"><button id="to-slots">${tr("continue")}</button></div>`);
  }

  list.onclick=e=>{
    if(e.target.hasAttribute("data-notice")){
      state.noticesDone++;
      renderNotices();
    }
  };
  document.querySelector("#to-slots")?.addEventListener("click",renderSlots);
}

function renderSlots(message=""){
  state.step="slots";
  setProgress(3);
  app.innerHTML=`
    <h2>${tr("choose")}</h2>
    <p class="muted">${tr("chooseHelp")}</p>
    ${message?`<p class="error">${esc(message)}</p>`:""}
    <div class="paired-choice-list">
      ${Object.entries(PLAN).map(([id,p])=>`
        <button class="choice paired-choice ${state.slotId===id?"selected":""}" type="button" data-slot="${id}">
          <strong>${orderLabel(p.order)}</strong>
          <span>${p.order==="POLYU_FIRST"
            ? `理工 ${esc(splitSlot(p.polyuTime).time)}　→　屯門 ${esc(splitSlot(p.tmhTime).time)}`
            : `屯門 ${esc(splitSlot(p.tmhTime).time)}　→　理工 ${esc(splitSlot(p.polyuTime).time)}`}</span>
        </button>`).join("")}
    </div>
    <div class="actions">
      <button class="secondary" id="back">${tr("back")}</button>
      <button id="book">${tr("book")}</button>
    </div>`;

  app.querySelectorAll("[data-slot]").forEach(btn=>{
    btn.onclick=()=>{
      state.slotId=btn.dataset.slot;
      renderSlots();
    };
  });
  document.querySelector("#back").onclick=renderNotices;
  document.querySelector("#book").onclick=submitBooking;
}

async function submitBooking(e){
  if(!state.slotId) return renderSlots(tr("needChoice"));
  e.target.disabled=true;
  e.target.textContent=tr("booking");

  try{
    const result=await api({
      action:"bookReplacement",
      phone:state.phone,
      slotId:state.slotId,
      acknowledged:true
    });

    if(result.waitlisted){
      state.participant.status="WAITLIST";
      state.participant.waitlistPreference=result.preference;
      renderWaitlist(PLAN[state.slotId]);
      return;
    }

    state.participant.status="BOOKED";
    state.participant.appointment=result.appointment;
    renderBookedResult(result.appointment);
  }catch(err){
    renderSlots(err.code==="BUSY"?tr("error"):tr("error"));
  }
}

function renderWaitlist(plan){
  state.step="waitlist";
  setProgress(4);
  const p=plan || planFromPreference(state.participant.waitlistPreference);
  app.innerHTML=`
    <h2>${tr("waitlistTitle")}</h2>
    <div class="important"><strong>${tr("waitlistBody")}</strong></div>
    ${p?`<div class="appointment">
      <strong>${orderLabel(p.order)}</strong>
      <p>${p.order==="POLYU_FIRST"
        ? `理工 ${esc(splitSlot(p.polyuTime).time)} → 屯門 ${esc(splitSlot(p.tmhTime).time)}`
        : `屯門 ${esc(splitSlot(p.tmhTime).time)} → 理工 ${esc(splitSlot(p.polyuTime).time)}`}</p>
    </div>`:""}
    <div class="actions"><a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a></div>`;
}

function resultCard(site,value,note,cls){
  return `<div class="appointment ${cls}">
    <span>${site}：${tr("scanTime")}</span>
    <strong>${dateLabel(value)}<br>${esc(splitSlot(value).time)}</strong>
    <small><strong>${tr("arrival")}：${esc(arrivalTime(value))}</strong></small>
    <p class="muted compact">${note}</p>
  </div>`;
}

function renderBookedResult(a){
  state.step="booked";
  setProgress(4);
  const firstPolyu=a.order!=="TMH_FIRST";
  const cards=firstPolyu
    ? resultCard(tr("polyu"),a.polyuTime,tr("polyuSignal"),"fixed")+resultCard(tr("tmh"),a.tmhTime,tr("tmhMeet"),"hospital")
    : resultCard(tr("tmh"),a.tmhTime,tr("tmhMeet"),"hospital")+resultCard(tr("polyu"),a.polyuTime,tr("polyuSignal"),"fixed");

  app.innerHTML=`
    <h2 class="success">${tr("bookedTitle")}</h2>
    <div class="important"><strong>${tr("bookedWarning")}</strong></div>

    <div class="summary">
      <div><strong>${tr("participant")}</strong><br>${esc(state.participant.name)}</div>
      <div><strong>${tr("order")}</strong><br>${orderLabel(a.order)}</div>
    </div>

    ${cards}

    <address>
      <strong>${tr("polyu")}</strong><br>
      Z座地下二樓 ZB217<br>UBSN 神經科學實驗室<br>
      ${tr("contact")}
    </address>

    <address>
      <strong>${tr("tmh")}</strong><br>
      主座地下放射科（X光部門）<br>新界屯門青松觀路23號<br>
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

    <section class="panel">
      <h3>${tr("docs")}</h3>
      <div class="actions">
        <a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">${state.lang==="zh"?"參加者須知":"Information sheet"}</a>
        <a class="button-link" href="${FILES.consent}" target="_blank" rel="noopener">${state.lang==="zh"?"同意書":"Consent form"}</a>
      </div>
    </section>

    ${a.qr?`<div class="qr">
      <h3>${tr("qr")}</h3>
      <img src="${esc(a.qr)}" alt="Campus entry QR code">
      <a class="button-link" href="${esc(a.qr)}" target="_blank" rel="noopener">${tr("qrSave")}</a>
    </div>`:""}`;
}

document.addEventListener("keydown",event=>{
  if(event.key!=="Enter" || state.step!=="notices") return;
  const tag=(event.target && event.target.tagName || "").toUpperCase();
  if(["A","BUTTON","INPUT","SELECT","TEXTAREA"].includes(tag)) return;
  const next=document.querySelector('#notices button[data-notice]:not([disabled])');
  const cont=document.querySelector("#to-slots");
  if(next){event.preventDefault();next.click();}
  else if(cont){event.preventDefault();cont.click();}
});

document.querySelector("#language").onclick=()=>{
  state.lang=state.lang==="zh"?"en":"zh";
  translatePage();
  const render={
    phone:renderPhone,
    notices:renderNotices,
    slots:renderSlots,
    waitlist:()=>renderWaitlist(),
    booked:()=>renderBookedResult(state.participant.appointment)
  }[state.step];
  if(render) render();
};

translatePage();
renderPhone();
