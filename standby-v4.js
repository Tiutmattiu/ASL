const INCENTIVE_AMOUNT = 200;

const FILES = {
  info: "assets/participant-information-sheet.pdf",
  consent: "assets/consent-form.pdf",
  polyuGuide: "assets/polyu-to-ubsn.pdf",
  tmhGuide: "assets/polyu-to-tmh.pdf"
};

const PLAN = {
  B: {
    polyu:"2026-10-04 13:00–13:30",
    tmh:"2026-10-04 15:00–15:30",
    order:"POLYU_FIRST",
    qr:"https://drive.google.com/thumbnail?id=1Lid_keX_jGDryzDUmKMq2fw080LTRPzP&sz=w1000"
  },
  D: {
    polyu:"2026-10-04 16:30–17:00",
    tmh:"2026-10-04 13:30–14:00",
    order:"TMH_FIRST",
    qr:"https://drive.google.com/thumbnail?id=1PnPcDVYIQP_XFe8enpLHE9VVUjXLoZOX&sz=w1000"
  }
};

const NOTICES = {
  zh: [
    `請先閱讀完整的<strong>《參加者須知》</strong>.然後閱讀同意書。<br><br><strong>MRI 意外發現是什麼？</strong><br>MRI 意外發現是指研究掃描中偶然發現可能需要進一步醫療評估的異常，例如疑似<strong>腦出血、中風、腫瘤</strong>或其他明顯異常。研究 MRI 並不是正式的臨床診斷檢查，也不會提供常規影像報告。<br><br>如果你在同意書中勾選<strong>「希望得到通知」</strong>：若研究人員在影像中發現上述可能具有臨床意義的異常，我們會在發現後聯絡你。<br><br>如果你勾選<strong>「不希望得到通知」</strong>：即使研究影像中發現可能的異常，我們也不會因本研究的影像結果主動通知你。<br><br>如果之後正式確認參加，請在同意書中選擇其中一項，並填寫姓名、簽署及日期。<div class="actions"><a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">參加者須知</a><a class="button-link secondary-link" href="${FILES.consent}" target="_blank" rel="noopener">同意書</a></div>`,
    "你需要在<strong>同一天</strong>完成香港理工大學及屯門醫院兩次 MRI 掃描。",
    "香港理工大學及屯門醫院的<strong>掃描時間均為固定時間</strong>；請從目前提供的固定配對安排中選擇一個。",
    "兩個地點都建議在<strong>掃描時間前約 30 分鐘到達</strong>。",
    "掃描前請保持<strong>至少 2 小時未進食</strong>。",
    "掃描當天<strong>請勿吸煙、飲酒、飲用咖啡或茶</strong>，並避免能量飲品及其他含咖啡因產品。",
    "掃描前一晚<strong>請勿熬夜</strong>，並保持充足睡眠。",
    "掃描前請避免劇烈運動及強烈情緒激動，保持正常休息。",
    "掃描前 3 天請盡量避免不必要的藥物。如因醫療需要必須服藥，請按醫生指示正常服用，<strong>不要自行停藥</strong>，並告知研究團隊藥物名稱及劑量。",
    "香港理工大學與屯門醫院之間請預留約 <strong>1–1.5 小時</strong>公共交通時間。",
    "到達香港理工大學或屯門醫院後，請直接<strong>致電或 WhatsApp 91230084</strong>。屯門醫院請在主座地下放射科（X光部門）門口等候工作人員。",
    `完成兩次掃描後可獲 <strong>HK$${INCENTIVE_AMOUNT}</strong> 研究參與津貼；津貼只發放一次。`
  ],
  en: [
    `Please first read the full <strong>Participant Information Sheet</strong>. You may also review the consent form now.<br><br><strong>What is an incidental MRI finding?</strong><br>This means an unexpected abnormality noticed during the research scan that may require further medical assessment, for example a suspected <strong>brain haemorrhage, stroke, tumour</strong>, or another obvious abnormality. A research MRI is not a formal clinical diagnostic examination and does not provide a routine radiology report.<br><br>If you select <strong>“I wish to be notified”</strong>: if the researchers identify a potentially clinically significant abnormality, we will contact you after it is found.<br><br>If you select <strong>“I do not wish to be notified”</strong>: even if a possible abnormality is seen on the research images, we will not proactively notify you on the basis of the research images.<br><br>If you are later formally confirmed, please choose one option on the consent form, then enter your name, sign and date it.<div class="actions"><a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">Information sheet</a><a class="button-link secondary-link" href="${FILES.consent}" target="_blank" rel="noopener">Consent form</a></div>`,
    "You must complete both MRI scans at <strong>PolyU and Tuen Mun Hospital on the same day</strong>.",
    "The scan times at <strong>both locations are fixed</strong>. Please choose one of the available paired arrangements.",
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
    title:"研究掃描候補",
    footer:"不同場強下動脈自旋標記成像一致性研究",
    step:"步驟",
    phoneTitle:"輸入聯絡電話",
    phoneHelp:"請使用你在研究登記時提供的電話號碼。系統會直接讀取你已登記的資料，不需要重新填寫姓名、年齡或性別。",
    phone:"電話號碼",
    continue:"繼續",
    back:"返回",
    finding:"正在查找…",
    notFound:"找不到這個電話號碼，請確認已完成第一階段研究登記，或直接聯絡 91230084。",
    genericError:"暫時無法連接系統，請稍後再試。",
    alreadyBooked:"你已經有正式掃描預約。請返回參加者頁面查看現有安排。",
    openPortal:"查看我的正式預約",
    participant:"參加者",
    notices:"請逐項閱讀",
    understand:"我知道了",
    understood:"已明白 ✓",
    chooseSlot:"選擇一個掃描安排",
    slotHelp:"以下兩個安排均為固定配對；請選擇其中一個。",
    polyuFirst:"理工 → 屯門",
    tmhFirst:"屯門 → 理工",
    waitlistTitle:"已加入候補名單",
    waitlistBody:"你選擇的安排已被另一位參加者先選取。你的資料已加入候補名單；如該安排再次有空缺，研究團隊會聯絡你。請勿自行前往。",
    selected:"已選擇",
    submit:"提交候補",
    submitting:"正在提交…",
    needSlot:"請先選擇一個時間。",
    candidateTitle:"候補安排已提交",
    candidateWarning:"這仍然是候補，並不是正式預約。只有收到研究團隊以電話或 WhatsApp 明確確認後，才代表你獲得這個時段；未收到確認請不要自行前往。",
    order:"次序",
    polyu:"香港理工大學 UBSN",
    tmh:"屯門醫院",
    fixedScan:"固定掃描時間",
    arrival:"建議到達",
    preparation:"掃描前準備",
    travel:"兩地公共交通請預留約 1–1.5 小時。",
    contact:"到達後請電話或 WhatsApp 91230084 聯絡研究團隊。",
    polyuSignal:"ZB217 位於 LG2，手機訊號可能較弱；建議乘升降機到 LG2 前先聯絡我們。",
    tmhMeet:"到達屯門醫院後，請到主座地下放射科（X光部門）門口等候，工作人員會前往接你。",
    incentive:"研究參與津貼",
    incentiveText:"正式確認並完成兩次掃描後可獲 HK$200，津貼只發放一次。",
    docs:"研究文件",
    qr:"PolyU 校園入場二維碼",
    qrSave:"查看／儲存入場二維碼",
    routes:"路線指引",
    polyuRoute:"前往 PolyU UBSN / ZB217",
    tmhRoute:"PolyU → 屯門醫院",
    alreadyRegistered:"這個電話已有候補／研究記錄，如需更改請直接 WhatsApp 91230084。"
  },
  en: {
    title:"Study Scan Standby",
    footer:"Consistency of arterial spin labelling imaging across field strengths",
    step:"Step",
    phoneTitle:"Enter your contact number",
    phoneHelp:"Use the phone number provided during study registration. Your existing details will be loaded automatically; you do not need to re-enter your name, age or sex.",
    phone:"Phone number",
    continue:"Continue",
    back:"Back",
    finding:"Looking up…",
    notFound:"We could not find that phone number. Please make sure you completed the first-stage study registration, or contact 91230084.",
    genericError:"The service is temporarily unavailable. Please try again later.",
    alreadyBooked:"You already have a confirmed scan booking. Please return to the participant portal to view it.",
    openPortal:"View my confirmed booking",
    participant:"Participant",
    notices:"Please read each item",
    understand:"I understand",
    understood:"Understood ✓",
    chooseSlot:"Choose one scan arrangement",
    slotHelp:"Both options are fixed paired arrangements. Please choose one.",
    polyuFirst:"PolyU → Tuen Mun Hospital",
    tmhFirst:"Tuen Mun Hospital → PolyU",
    waitlistTitle:"Added to the waitlist",
    waitlistBody:"Another participant selected this arrangement first. You have been added to the waitlist; the study team will contact you if the arrangement becomes available again. Please do not attend unless contacted.",
    selected:"Selected",
    submit:"Submit standby",
    submitting:"Submitting…",
    needSlot:"Please choose a time first.",
    candidateTitle:"Standby arrangement submitted",
    candidateWarning:"This is still standby and is not a confirmed appointment. You have the slot only after the study team explicitly confirms it by phone or WhatsApp. Do not attend unless you receive confirmation.",
    order:"Order",
    polyu:"PolyU UBSN",
    tmh:"Tuen Mun Hospital",
    fixedScan:"Fixed scan time",
    arrival:"Recommended arrival",
    preparation:"Before your scans",
    travel:"Allow approximately 1–1.5 hours for public transport between the two sites.",
    contact:"On arrival, call or WhatsApp 91230084.",
    polyuSignal:"ZB217 is on LG2 and mobile signal may be weak. Contact us before taking the lift down to LG2.",
    tmhMeet:"At Tuen Mun Hospital, wait outside Radiology (X-ray) on the ground floor of the Main Block. A staff member will meet you there.",
    incentive:"Study participation incentive",
    incentiveText:"If formally confirmed, you will receive HK$200 after completing both scans. It is paid once.",
    docs:"Study documents",
    qr:"PolyU campus entry QR code",
    qrSave:"View / save QR code",
    routes:"Directions",
    polyuRoute:"Getting to PolyU UBSN / ZB217",
    tmhRoute:"PolyU → Tuen Mun Hospital",
    alreadyRegistered:"This phone number already has a standby/study record. Please WhatsApp 91230084 if you need to change it."
  }
};

const state = {
  lang:"zh",
  step:"phone",
  phone:"",
  participant:null,
  noticesDone:0,
  slotId:""
};

const app=document.querySelector("#app");
const tr=k=>T[state.lang][k];

function esc(value=""){
  const el=document.createElement("span");
  el.textContent=value==null?"":String(value);
  return el.innerHTML;
}

function setProgress(n){
  document.querySelector("#progress").textContent=n?`${tr("step")} ${n} / 4`:"";
}

function translatePage(){
  document.documentElement.lang=state.lang==="zh"?"zh-Hant":"en";
  document.querySelectorAll("[data-text]").forEach(el=>el.textContent=tr(el.dataset.text));
  document.querySelector("#language").textContent=state.lang==="zh"?"English":"中文";
}

function slotParts(value){
  const text=String(value||"");
  const i=text.indexOf(" ");
  return i<0?{date:"",time:text}:{date:text.slice(0,i),time:text.slice(i+1)};
}

function arrivalTime(value){
  const time=slotParts(value).time;
  const m=time.match(/(\d{1,2}):(\d{2})/);
  if(!m)return"";
  const total=Number(m[1])*60+Number(m[2])-30;
  const x=(total+1440)%1440;
  return String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0");
}

function dateLabel(value){
  const date=slotParts(value).date || String(value || "");
  const map={
    "2026-10-04": state.lang==="zh" ? "2026 年 10 月 4 日" : "4 October 2026",
    "2026-10-10": state.lang==="zh" ? "2026 年 10 月 10 日" : "10 October 2026"
  };
  return map[date] || date;
}

function orderLabel(order){
  if(state.lang==="zh") return order==="POLYU_FIRST"?"香港理工大學 → 屯門醫院":"屯門醫院 → 香港理工大學";
  return order==="POLYU_FIRST"?"PolyU → Tuen Mun Hospital":"Tuen Mun Hospital → PolyU";
}

function preparationList(){
  const items=state.lang==="zh"
    ?[
      "掃描前至少 2 小時不要進食",
      "掃描當天不要吸煙、飲酒，或飲用咖啡、茶及其他含咖啡因產品",
      "前一晚不要熬夜，保持充足睡眠",
      "避免劇烈運動及強烈情緒激動",
      "必要藥物按醫囑正常服用，不要自行停藥，並告知研究團隊藥名及劑量",
      "兩個地點均建議提前約 30 分鐘到達"
    ]
    :[
      "Do not eat for at least 2 hours before scanning",
      "Do not smoke, drink alcohol, or consume coffee, tea or other caffeinated products on the scan day",
      "Do not stay up late; get sufficient sleep",
      "Avoid strenuous exercise and strong emotional excitement",
      "Take medically necessary medication as directed; do not stop it on your own, and tell the study team the name and dose",
      "Please arrive about 30 minutes early at both locations"
    ];
  return `<ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`;
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
      <label for="phone">${tr("phone")}</label>
      <div class="phone">
        <select id="country">
          <option value="+852">+852 Hong Kong</option>
          <option value="+86">+86 Mainland China</option>
        </select>
        <input id="phone" type="tel" inputmode="tel" autocomplete="tel" required>
      </div>
      <button type="submit">${tr("continue")}</button>
    </form>
  `;
  document.querySelector("#phone-form").onsubmit=lookup;
}

async function lookup(e){
  e.preventDefault();
  const btn=e.currentTarget.querySelector("button");
  btn.disabled=true;
  btn.textContent=tr("finding");
  state.phone=document.querySelector("#country").value+document.querySelector("#phone").value.replace(/\s+/g,"");
  try{
    const r=await api({action:"lookup",phone:state.phone});
    state.participant=r.participant;
    if(state.participant.appointment){
      app.innerHTML=`
        <h2>${esc(state.participant.name)}</h2>
        <p class="important">${tr("alreadyBooked")}</p>
        <a class="button-link" href="./">${tr("openPortal")}</a>
      `;
      setProgress(1);
      return;
    }
    state.noticesDone=0;
    renderNotices();
  }catch(err){
    renderPhone(err.code==="NOT_FOUND"?tr("notFound"):tr("genericError"));
  }
}

function renderNotices(){
  state.step="notices";
  setProgress(2);
  const p=state.participant;
  app.innerHTML=`
    <div class="summary">
      <div><strong>${tr("participant")}</strong><br>${esc(p.name)}</div>
      <div><strong>${tr("phone")}</strong><br>${esc(state.phone.replace(/^\+852/,"").replace(/^\+86/,""))}</div>
    </div>
    <h2 style="margin-top:22px">${tr("notices")}</h2>
    <div id="notices"></div>
  `;
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
        <button id="to-slots">${tr("continue")}</button>
      </div>
    `);
  }

  list.onclick=e=>{
    if(e.target.hasAttribute("data-notice")){
      state.noticesDone++;
      renderNotices();
    }
  };
  document.querySelector("#to-slots")?.addEventListener("click",()=>renderSlots());
}

function renderSlots(message=""){
  state.step="slots";
  setProgress(3);

  app.innerHTML=`
    <h2>${tr("chooseSlot")}</h2>
    <p class="muted">${tr("slotHelp")}</p>
    ${message?`<p class="error">${esc(message)}</p>`:""}

    <div class="date-group">
      <h3>${dateLabel("2026-10-04")}</h3>
      <div class="paired-choice-list">
        ${Object.entries(PLAN).map(([id,p])=>`
          <button class="choice paired-choice ${state.slotId===id?"selected":""}" type="button" data-slot="${id}">
            <strong>${orderLabel(p.order)}</strong>
            <span>
              ${p.order==="POLYU_FIRST"
                ? `理工 ${esc(slotParts(p.polyu).time)}　→　屯門 ${esc(slotParts(p.tmh).time)}`
                : `屯門 ${esc(slotParts(p.tmh).time)}　→　理工 ${esc(slotParts(p.polyu).time)}`
              }
            </span>
          </button>
        `).join("")}
      </div>
    </div>

    <div class="actions">
      <button class="secondary" id="back">${tr("back")}</button>
      <button id="submit">${tr("submit")}</button>
    </div>
  `;

  app.querySelectorAll("[data-slot]").forEach(btn=>{
    btn.onclick=()=>{
      state.slotId=btn.dataset.slot;
      renderSlots();
    };
  });
  document.querySelector("#back").onclick=renderNotices;
  document.querySelector("#submit").onclick=submitStandby;
}

async function submitStandby(e){
  if(!state.slotId) return renderSlots(tr("needSlot"));
  e.target.disabled=true;
  e.target.textContent=tr("submitting");
  try{
    const result=await api({
      action:"standbySelect",
      phone:state.phone,
      slotId:state.slotId,
      acknowledged:true
    });
    if(result.waitlisted){
      renderWaitlist();
    }else{
      renderFinal();
    }
  }catch(err){
    e.target.disabled=false;
    e.target.textContent=tr("submit");
    const msg=err.code==="ALREADY_BOOKED"?tr("alreadyBooked"):err.code==="ALREADY_REGISTERED"?tr("alreadyRegistered"):tr("genericError");
    renderSlots(msg);
  }
}

function renderWaitlist(){
  state.step="waitlist";
  setProgress(4);
  app.innerHTML=`
    <h2 class="success">${tr("waitlistTitle")}</h2>
    <div class="important"><strong>${tr("waitlistBody")}</strong></div>
    <div class="actions">
      <a class="button-link" href="https://wa.me/85291230084" target="_blank" rel="noopener">WhatsApp 91230084</a>
    </div>
  `;
}

function renderFinal(){
  state.step="final";
  setProgress(4);
  const p=state.participant;
  const a=PLAN[state.slotId];
  const qr=a.qr;
  const firstPolyu=a.order==="POLYU_FIRST";

  const card=(site,value,note,cls)=>`
    <div class="appointment ${cls}">
      <span>${site}：${tr("fixedScan")}</span>
      <strong>${dateLabel(value)}<br>${esc(slotParts(value).time)}</strong>
      <small><strong>${tr("arrival")}：${esc(arrivalTime(value))}</strong></small>
      <p class="muted compact" style="margin-top:10px">${note}</p>
    </div>
  `;

  const cards=firstPolyu
    ? card(tr("polyu"),a.polyu,tr("polyuSignal"),"fixed")+card(tr("tmh"),a.tmh,tr("tmhMeet"),"suggested")
    : card(tr("tmh"),a.tmh,tr("tmhMeet"),"suggested")+card(tr("polyu"),a.polyu,tr("polyuSignal"),"fixed");

  app.innerHTML=`
    <h2 class="success">${tr("candidateTitle")}</h2>
    <p class="study-title">${tr("footer")}</p>

    <div class="important">
      <strong>${tr("candidateWarning")}</strong>
    </div>

    <div class="summary">
      <div><strong>${tr("participant")}</strong><br>${esc(p.name)}</div>
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

    <p class="important">
      <strong>${tr("travel")}</strong>
    </p>

    <section class="preparation">
      <h3>${tr("preparation")}</h3>
      ${preparationList()}
    </section>

    <section class="incentive">
      <h3>${tr("incentive")}</h3>
      <p><strong>${tr("incentiveText")}</strong></p>
    </section>

    <section class="preparation">
      <h3>${tr("routes")}</h3>
      <div class="actions">
        <a class="button-link" href="${FILES.polyuGuide}" target="_blank" rel="noopener">${tr("polyuRoute")}</a>
        <a class="button-link secondary-link" href="${FILES.tmhGuide}" target="_blank" rel="noopener">${tr("tmhRoute")}</a>
      </div>
    </section>

    <section class="preparation">
      <h3>${tr("docs")}</h3>
      <div class="actions">
        <a class="button-link" href="${FILES.info}" target="_blank" rel="noopener">${state.lang==="zh"?"參加者須知":"Information sheet"}</a>
        <a class="button-link secondary-link" href="${FILES.consent}" target="_blank" rel="noopener">${state.lang==="zh"?"同意書":"Consent form"}</a>
      </div>
    </section>

    <div class="qr">
      <h3>${tr("qr")}</h3>
      <img src="${esc(qr)}" alt="Campus entry QR code">
      <a class="button-link" href="${esc(qr)}" target="_blank" rel="noopener">${tr("qrSave")}</a>
    </div>
  `;
}

document.querySelector("#language").addEventListener("click",()=>{
  state.lang=state.lang==="zh"?"en":"zh";
  translatePage();
  const render={
    phone:renderPhone,
    notices:renderNotices,
    slots:renderSlots,
    waitlist:renderWaitlist,
    final:renderFinal
  }[state.step];
  if(render) render();
});

translatePage();
renderPhone();
