const INCENTIVE_AMOUNT = 200;


// ============================================================
// DATE LABELS
// ============================================================

const SLOT_LABELS = {
  zh: {
    "2026-09-13": "2026 年 9 月 13 日",
    "2026-10-04": "2026 年 10 月 4 日",
    "2026-10-10": "2026 年 10 月 10 日"
  },

  en: {
    "2026-09-13": "13 September 2026",
    "2026-10-04": "4 October 2026",
    "2026-10-10": "10 October 2026"
  }
};


// ============================================================
// FIXED SCAN PLAN
//
// Every PolyU slot has:
// - one required scan order
// - one suggested TMH arrival window
//
// TMH is assumed to operate 09:00–19:00.
// Suggested TMH arrival is kept within 09:00–17:30.
// No two participants on the same date are deliberately
// given the same TMH arrival window.
// ============================================================

const SCAN_PLAN = {

  // ----------------------------------------------------------
  // 13 September
  // ----------------------------------------------------------

  "2026-09-13 14:00–14:30": {
    order: "POLYU_FIRST",
    tmh: "2026-09-13 16:00–16:30"
  },

  "2026-09-13 14:30–15:00": {
    order: "POLYU_FIRST",
    tmh: "2026-09-13 16:30–17:00"
  },


  // ----------------------------------------------------------
  // 4 October
  // ----------------------------------------------------------

  "2026-10-04 09:00–09:30": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 11:00–11:30"
  },

  "2026-10-04 09:30–10:00": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 11:30–12:00"
  },

  "2026-10-04 10:00–10:30": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 12:00–12:30"
  },

  "2026-10-04 10:30–11:00": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 12:30–13:00"
  },

  "2026-10-04 11:00–11:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 09:00–09:30"
  },

  "2026-10-04 11:30–12:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 09:30–10:00"
  },

  "2026-10-04 12:00–12:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 10:00–10:30"
  },

  "2026-10-04 12:30–13:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 10:30–11:00"
  },

  "2026-10-04 13:00–13:30": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 15:00–15:30"
  },

  "2026-10-04 14:30–15:00": {
    order: "POLYU_FIRST",
    tmh: "2026-10-04 16:30–17:00"
  },

  "2026-10-04 16:00–16:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 13:00–13:30"
  },

  "2026-10-04 16:30–17:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 13:30–14:00"
  },

  "2026-10-04 17:00–17:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 14:00–14:30"
  },

  "2026-10-04 17:30–18:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 14:30–15:00"
  },

  "2026-10-04 18:00–18:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-04 15:30–16:00"
  },


  // ----------------------------------------------------------
  // 10 October
  // ----------------------------------------------------------

  "2026-10-10 09:00–09:30": {
    order: "POLYU_FIRST",
    tmh: "2026-10-10 11:00–11:30"
  },

  "2026-10-10 09:30–10:00": {
    order: "POLYU_FIRST",
    tmh: "2026-10-10 11:30–12:00"
  },

  "2026-10-10 11:30–12:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 09:00–09:30"
  },

  "2026-10-10 12:00–12:30": {
    order: "POLYU_FIRST",
    tmh: "2026-10-10 14:00–14:30"
  },

  "2026-10-10 12:30–13:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 09:30–10:00"
  },

  "2026-10-10 13:00–13:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 10:30–11:00"
  },

  "2026-10-10 14:30–15:00": {
    order: "POLYU_FIRST",
    tmh: "2026-10-10 16:30–17:00"
  },

  "2026-10-10 16:30–17:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 13:30–14:00"
  },

  "2026-10-10 17:00–17:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 14:30–15:00"
  },

  "2026-10-10 17:30–18:00": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 15:00–15:30"
  },

  "2026-10-10 18:00–18:30": {
    order: "TMH_FIRST",
    tmh: "2026-10-10 15:30–16:00"
  }
};


// ============================================================
// PREPARATION NOTICES
// ============================================================

const NOTICES = {

  zh: [
    "你需要在<strong>同一天</strong>完成香港理工大學及屯門醫院兩次掃描。",

    "掃描前請保持<strong>至少 2 小時未進食</strong>，即距離上一次進食至少 2 小時。",

    "掃描當天<strong>請勿吸煙、飲酒、飲用咖啡或茶</strong>，並避免其他含咖啡因的食物或飲品，包括能量飲品及其他含咖啡因產品。",

    "掃描前一晚<strong>請勿熬夜</strong>，並請保持充足睡眠。",

    "掃描前請避免劇烈運動及強烈情緒激動，並保持正常休息。",

    "掃描前 3 天請盡量避免不必要的藥物使用。如因醫療需要必須服藥，請按醫生指示正常服用，<strong>不要自行停藥</strong>，並告知研究團隊藥物名稱及劑量。",

    "屯門醫院<strong>無需另外預約固定時間</strong>。系統會根據你選擇的香港理工大學掃描時段及掃描次序，提供當天屯門醫院的建議到達時間。請按確認頁顯示的時間安排行程。",

    "香港理工大學與屯門醫院之間請預留約 <strong>1–1.5 小時</strong>公共交通時間。",

    "<strong>請勿早於預約時間超過 15 分鐘</strong>到達香港理工大學。過早到達可能需要較長時間等候。",

    "如不能出席或需要更改時間，請盡早處理。距離預約不足 24 小時時，請直接聯絡研究團隊。",

    `完成同一天兩個地點的掃描後，你將獲得 <strong>HK$${INCENTIVE_AMOUNT}</strong> 的研究參與津貼。津貼只會發放一次，並由你當天最後完成掃描的地點發放。`
  ],

  en: [
    "You must complete both the PolyU and Tuen Mun Hospital scans on the <strong>same day</strong>.",

    "Please <strong>do not eat for at least 2 hours</strong> before your scan.",

    "On the day of your scans, <strong>please do not smoke, drink alcohol, drink coffee or tea</strong>, and avoid other caffeinated foods or drinks, including energy drinks and other caffeinated products.",

    "Please <strong>do not stay up late</strong> the night before your scans and make sure you get sufficient sleep.",

    "Please avoid strenuous exercise and strong emotional excitement before your scans, and maintain normal rest.",

    "Please avoid unnecessary medication where possible during the 3 days before scanning. If medication is medically necessary, follow your clinician's instructions and <strong>do not stop prescribed medication on your own</strong>. Tell the study team the medication name and dose.",

    "<strong>No separate fixed appointment is required</strong> at Tuen Mun Hospital. The system will provide a suggested hospital arrival time based on your PolyU appointment and scan order. Please plan your trip according to the time shown on the confirmation page.",

    "Please allow approximately <strong>1–1.5 hours</strong> for public transport between PolyU and Tuen Mun Hospital.",

    "<strong>Please do not arrive at PolyU more than 15 minutes before</strong> your appointment time. Arriving too early may result in a longer waiting time.",

    "If you cannot attend or need to change your appointment, make the change as early as possible. If your appointment is less than 24 hours away, contact the study team directly.",

    `After completing both scans on the same day, you will receive a <strong>HK$${INCENTIVE_AMOUNT}</strong> study participation incentive. It is paid once, at the location where you complete your final scan.`
  ]
};


// ============================================================
// TRANSLATIONS
// ============================================================

const T = {

  zh: {

    title: "研究掃描預約",

    footer:
      "不同場強下動脈自旋標記成像一致性研究",

    step: "步驟",

    phoneTitle:
      "輸入聯絡電話",

    phoneHelp:
      "請使用研究登記時提供的完整電話號碼。",

    phone:
      "電話號碼",

    continue:
      "繼續",

    finding:
      "正在查找…",

    notFound:
      "找不到這個電話號碼，請檢查後再試。",

    genericError:
      "暫時無法連接預約系統，請稍後再試。",

    hello:
      "你好",

    identity:
      "請確認這是你的姓名。",

    arranged:
      "你的檢查時間已經安排。",

    notices:
      "請逐項閱讀掃描準備事項",

    understand:
      "我知道了",

    understood:
      "已明白 ✓",

    chooseOrder:
      "你希望先去哪一個掃描地點？",

    sameDay:
      "你需要在同一天完成香港理工大學及屯門醫院兩次掃描。",

    scheduleRule:
      "香港理工大學需要預約指定時間。",

    travelRule:
      "屯門醫院無需另外預約固定時段。系統會提供建議到達時間，兩地之間請預留約 1–1.5 小時公共交通時間。",

    polyuFirst:
      "香港理工大學 → 屯門醫院",

    tmhFirst:
      "屯門醫院 → 香港理工大學",

    collectTmh:
      "完成屯門醫院掃描後領取 HK$200 津貼。",

    collectPolyu:
      "完成香港理工大學掃描後領取 HK$200 津貼。",

    chooseSlot:
      "選擇香港理工大學掃描時間",

    noSlots:
      "目前所有時段已滿，我們會稍後聯絡你安排候補時間。",

    waitlist:
      "加入候補",

    waitlisted:
      "你已加入候補名單。",

    review:
      "核對預約",

    polyuFixed:
      "香港理工大學：正式預約時間",

    tmhSuggested:
      "屯門醫院：建議到達時間",

    around:
      "約",

    hospitalOnly:
      "此為建議到達時間，供當日行程安排使用；屯門醫院無需另行預約固定時段。",

    order:
      "次序",

    incentive:
      "研究參與津貼",

    incentiveTmh:
      "HK$200 津貼：完成屯門醫院掃描後領取",

    incentivePolyu:
      "HK$200 津貼：完成香港理工大學掃描後領取",

    back:
      "返回",

    confirm:
      "確認預約",

    confirmChange:
      "確認更改",

    booking:
      "正在確認…",

    taken:
      "抱歉，這個時段剛被另一位參與者選取，請選擇其他時間。",

    confirmed:
      "預約已確認",

    changed:
      "預約已更改",

    participant:
      "參與者",

    print:
      "列印／儲存確認書",

    qrMissing:
      "校園入場二維碼將另行提供。",

    qrSave:
      "下載／儲存入場二維碼",

    contact:
      "聯絡電話",

    polyu:
      "香港理工大學",

    tmh:
      "屯門醫院",

    preparation:
      "掃描前準備",

    travel:
      "兩地公共交通請預留約 1–1.5 小時。",

    early:
      "PolyU 請勿提前超過 15 分鐘到達。",

    change:
      "更改預約",

    tooLate:
      "距離預約時間不足 24 小時。如需更改，請直接聯絡研究團隊。",

    paid:
      "兩次掃描及 HK$200 津貼發放已完成。"
  },


  en: {

    title:
      "Study scan booking",

    footer:
      "Consistency of arterial spin labelling imaging across field strengths",

    step:
      "Step",

    phoneTitle:
      "Enter your contact number",

    phoneHelp:
      "Use the full phone number provided when you joined the study.",

    phone:
      "Phone number",

    continue:
      "Continue",

    finding:
      "Looking up…",

    notFound:
      "We could not find that phone number. Please check and try again.",

    genericError:
      "The booking service is temporarily unavailable. Please try again later.",

    hello:
      "Hello",

    identity:
      "Please confirm this is your name.",

    arranged:
      "Your scan arrangement has already been completed.",

    notices:
      "Read each scan preparation instruction",

    understand:
      "I understand",

    understood:
      "Understood ✓",

    chooseOrder:
      "Which location would you like to visit first?",

    sameDay:
      "You must complete both the PolyU and Tuen Mun Hospital scans on the same day.",

    scheduleRule:
      "The PolyU scan has a fixed appointment time. To allow for Tuen Mun Hospital operating hours and travel between the two locations, each PolyU time has a planned scan order. Only available times compatible with your selected order will be shown.",

    travelRule:
      "No separate fixed appointment is required at Tuen Mun Hospital. The system will provide a suggested arrival time. Please allow approximately 1–1.5 hours for public transport between the two locations.",

    polyuFirst:
      "PolyU → Tuen Mun Hospital",

    tmhFirst:
      "Tuen Mun Hospital → PolyU",

    collectTmh:
      "Receive the HK$200 incentive after completing your Tuen Mun Hospital scan.",

    collectPolyu:
      "Receive the HK$200 incentive after completing your PolyU scan.",

    chooseSlot:
      "Choose a PolyU scan time",

    noSlots:
      "All slots are currently full. We will contact you about a waitlist time.",

    waitlist:
      "Join waitlist",

    waitlisted:
      "You have joined the waitlist.",

    review:
      "Review appointment",

    polyuFixed:
      "PolyU: fixed appointment",

    tmhSuggested:
      "Tuen Mun Hospital: suggested arrival",

    around:
      "Around",

    hospitalOnly:
      "This is a suggested arrival time for planning your trip. No separate fixed hospital appointment is required.",

    order:
      "Order",

    incentive:
      "Study participation incentive",

    incentiveTmh:
      "HK$200 incentive: collect after completing the Tuen Mun Hospital scan",

    incentivePolyu:
      "HK$200 incentive: collect after completing the PolyU scan",

    back:
      "Back",

    confirm:
      "Confirm booking",

    confirmChange:
      "Confirm change",

    booking:
      "Confirming…",

    taken:
      "Sorry, this time was just selected by another participant. Please choose another available time.",

    confirmed:
      "Appointment confirmed",

    changed:
      "Appointment changed",

    participant:
      "Participant",

    print:
      "Print / save appointment",

    qrMissing:
      "Campus entry QR code will be provided separately.",

    qrSave:
      "Download / save QR code",

    contact:
      "Contact",

    polyu:
      "The Hong Kong Polytechnic University",

    tmh:
      "Tuen Mun Hospital",

    preparation:
      "Scan preparation",

    travel:
      "Allow approximately 1–1.5 hours for public transport.",

    early:
      "Do not arrive at PolyU more than 15 minutes early.",

    change:
      "Change appointment",

    tooLate:
      "Your appointment is less than 24 hours away. Please contact the study team directly if you need to make a change.",

    paid:
      "Both scans and the HK$200 incentive payment have been completed."
  }
};


// ============================================================
// STATE
// ============================================================

const state = {
  lang: "zh",
  step: "phone",
  phone: "",
  participant: null,
  slots: [],
  noticesDone: 0,
  slot: "",
  order: "",
  changing: false,
  changed: false
};


const app =
  document.querySelector("#app");


// ============================================================
// BASIC HELPERS
// ============================================================

function tr(key) {
  return T[state.lang][key];
}


function esc(value = "") {
  const el =
    document.createElement("span");

  el.textContent =
    value;

  return el.innerHTML;
}


function safeUrl(value) {
  try {
    const url =
      new URL(value);

    return url.protocol === "https:"
      ? url.href
      : "";

  } catch {
    return "";
  }
}


function slotParts(slot) {
  const text =
    String(slot || "");

  const split =
    text.indexOf(" ");

  if (split === -1) {
    return {
      date: "",
      time: text
    };
  }

  return {
    date:
      text.slice(0, split),

    time:
      text.slice(split + 1)
  };
}


function dateLabel(date) {
  return (
    SLOT_LABELS[state.lang][date] ||
    date
  );
}


function orderLabel(order) {
  return (
    order === "POLYU_FIRST"
      ? tr("polyuFirst")
      : tr("tmhFirst")
  );
}


function incentiveText(order) {
  return (
    order === "POLYU_FIRST"
      ? tr("incentiveTmh")
      : tr("incentivePolyu")
  );
}


// ============================================================
// SCAN PLAN HELPERS
// ============================================================

function requiredOrderForSlot(slot) {
  const plan =
    SCAN_PLAN[
      String(slot || "").trim()
    ];

  return plan
    ? plan.order
    : "";
}


function slotAllowedForOrder(
  slot,
  order
) {
  const required =
    requiredOrderForSlot(slot);

  // Fail safely:
  // if a slot is missing from SCAN_PLAN,
  // do not display it.
  return Boolean(
    required &&
    required === order
  );
}


function suggestedHospitalTime(
  slot,
  order
) {
  const plan =
    SCAN_PLAN[
      String(slot || "").trim()
    ];

  if (
    !plan ||
    plan.order !== order
  ) {
    return "";
  }

  return slotParts(
    plan.tmh
  ).time;
}


// ============================================================
// PAGE HELPERS
// ============================================================

function setProgress(number) {
  document
    .querySelector("#progress")
    .textContent =
      number
        ? `${tr("step")} ${number} / 7`
        : "";
}


function translatePage() {
  document.documentElement.lang =
    state.lang === "zh"
      ? "zh-Hant"
      : "en";

  document
    .querySelectorAll(
      "[data-text]"
    )
    .forEach(
      el =>
        el.textContent =
          tr(el.dataset.text)
    );

  document
    .querySelector("#language")
    .textContent =
      state.lang === "zh"
        ? "English"
        : "中文";
}


// ============================================================
// API
// ============================================================

async function api(payload) {

  if (
    !ASL_CONFIG.WEB_APP_URL.startsWith(
      "https://script.google.com/"
    )
  ) {
    throw new Error(
      "Web app URL is not configured"
    );
  }

  const response =
    await fetch(
      ASL_CONFIG.WEB_APP_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(payload)
      }
    );

  const result =
    await response.json();

  if (!result.ok) {
    throw Object.assign(
      new Error(
        result.message ||
        "API error"
      ),
      {
        code: result.code,
        result
      }
    );
  }

  return result;
}


// ============================================================
// STEP 1 — PHONE
// ============================================================

function renderPhone(
  error = ""
) {
  state.step =
    "phone";

  setProgress(1);

  app.innerHTML =
    `
    <h2>${tr("phoneTitle")}</h2>

    <p class="muted">
      ${tr("phoneHelp")}
    </p>

    ${
      error
        ? `<p class="error">${esc(error)}</p>`
        : ""
    }

    <form id="phone-form">

      <label for="phone">
        ${tr("phone")}
      </label>

      <div class="phone">

        <select
          id="country"
          aria-label="Country code"
        >
          <option value="+852">
            +852 Hong Kong
          </option>

          <option value="+86">
            +86 Mainland China
          </option>
        </select>

        <input
          id="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          required
        >

      </div>

      <button type="submit">
        ${tr("continue")}
      </button>

    </form>
    `;

  document
    .querySelector(
      "#phone-form"
    )
    .addEventListener(
      "submit",
      lookup
    );
}


async function lookup(event) {

  event.preventDefault();

  const button =
    event.currentTarget
      .querySelector("button");

  button.disabled =
    true;

  button.textContent =
    tr("finding");

  state.phone =
    document
      .querySelector(
        "#country"
      ).value +
    document
      .querySelector(
        "#phone"
      ).value;

  try {

    const result =
      await api({
        action: "lookup",
        phone: state.phone
      });

    state.participant =
      result.participant;

    state.slots =
      result.availableSlots;

    state.noticesDone =
      0;

    state.changing =
      false;

    if (
      state.participant.appointment
    ) {
      renderConfirmation();
    } else {
      renderParticipant();
    }

  } catch (error) {

    renderPhone(
      error.code === "NOT_FOUND"
        ? tr("notFound")
        : tr("genericError")
    );
  }
}


// ============================================================
// STEP 2 — PARTICIPANT
// ============================================================

function renderParticipant() {

  state.step =
    "participant";

  setProgress(2);

  const blocked =
    ["S001", "S002"].includes(
      state.participant.sid
    );

  app.innerHTML =
    `
    <h2>
      ${tr("hello")},
      ${esc(state.participant.name)}
    </h2>

    <p>
      ${
        blocked
          ? tr("arranged")
          : tr("identity")
      }
    </p>

    ${
      blocked
        ? ""
        : `
          <button id="identity-confirm">
            ${tr("continue")}
          </button>
        `
    }
    `;

  document
    .querySelector(
      "#identity-confirm"
    )
    ?.addEventListener(
      "click",
      renderNotices
    );
}


// ============================================================
// STEP 3 — NOTICES
// ============================================================

function renderNotices() {

  state.step =
    "notices";

  setProgress(3);

  app.innerHTML =
    `
    <h2>
      ${tr("notices")}
    </h2>

    <div id="notices"></div>
    `;

  const list =
    document.querySelector(
      "#notices"
    );

  NOTICES[state.lang]
    .forEach(
      (text, index) => {

        const done =
          index <
          state.noticesDone;

        const unlocked =
          index <=
          state.noticesDone;

        list.insertAdjacentHTML(
          "beforeend",
          `
          <div class="notice ${
            done
              ? "done"
              : unlocked
                ? ""
                : "locked"
          }">

            <p>${text}</p>

            <button
              type="button"
              data-notice="${index}"
              ${
                unlocked &&
                !done
                  ? ""
                  : "disabled"
              }
            >
              ${
                done
                  ? tr("understood")
                  : tr("understand")
              }
            </button>

          </div>
          `
        );
      }
    );

  if (
    state.noticesDone ===
    NOTICES[state.lang].length
  ) {

    list.insertAdjacentHTML(
      "beforeend",
      `
      <div class="actions">

        <button id="to-order">
          ${tr("continue")}
        </button>

      </div>
      `
    );
  }

  list.addEventListener(
    "click",
    event => {

      if (
        event.target.hasAttribute(
          "data-notice"
        )
      ) {
        state.noticesDone++;

        renderNotices();
      }
    }
  );

  document
    .querySelector(
      "#to-order"
    )
    ?.addEventListener(
      "click",
      renderOrder
    );
}


// ============================================================
// STEP 4 — ORDER
// ============================================================

function renderOrder() {

  state.step =
    "order";

  setProgress(4);

  app.innerHTML =
    `
    <h2>
      ${tr("chooseOrder")}
    </h2>

    <div class="important">

      <p>
        <strong>
          ${tr("sameDay")}
        </strong>
      </p>

      <p>
        ${tr("scheduleRule")}
      </p>

      <p>
        ${tr("travelRule")}
      </p>

    </div>

    <button
      class="choice"
      data-order="POLYU_FIRST"
    >
      <strong>
        ${tr("polyuFirst")}
      </strong>

      <small>
        ${tr("collectTmh")}
      </small>
    </button>

    <button
      class="choice"
      data-order="TMH_FIRST"
    >
      <strong>
        ${tr("tmhFirst")}
      </strong>

      <small>
        ${tr("collectPolyu")}
      </small>
    </button>
    `;

  app.addEventListener(
    "click",
    event => {

      const choice =
        event.target.closest(
          "[data-order]"
        );

      if (choice) {

        state.order =
          choice.dataset.order;

        renderSlots();
      }
    }
  );
}


// ============================================================
// STEP 5 — SLOT
// ============================================================

function renderSlots(
  message = ""
) {

  state.step =
    "slots";

  setProgress(5);


  // Only show slots that are:
  // 1. still available globally
  // 2. compatible with the selected scan order

  const visibleSlots =
    state.slots.filter(
      slot =>
        slotAllowedForOrder(
          slot,
          state.order
        )
    );


  // ----------------------------------------------------------
  // No PolyU slots left globally
  // ----------------------------------------------------------

  if (
    !state.slots.length
  ) {

    app.innerHTML =
      `
      <h2>
        ${tr("noSlots")}
      </h2>

      ${
        message
          ? `
            <p class="success">
              ${tr("waitlisted")}
            </p>
          `
          : `
            <button id="waitlist">
              ${tr("waitlist")}
            </button>
          `
      }

      <div class="actions">

        <button
          class="secondary"
          id="back"
        >
          ${tr("back")}
        </button>

      </div>
      `;

    document
      .querySelector(
        "#waitlist"
      )
      ?.addEventListener(
        "click",
        joinWaitlist
      );

    document
      .querySelector(
        "#back"
      )
      .addEventListener(
        "click",
        renderOrder
      );

    return;
  }


  // ----------------------------------------------------------
  // Slots exist, but not for this order
  // ----------------------------------------------------------

  if (
    !visibleSlots.length
  ) {

    const explanation =
      state.lang === "zh"
        ? "目前剩餘的香港理工大學時段均不適合你所選的掃描次序。請返回並選擇另一個掃描次序，以查看其他可預約時間。"
        : "The remaining PolyU times are not compatible with the scan order you selected. Please go back and select the other scan order to view other available times.";

    app.innerHTML =
      `
      <h2>
        ${tr("chooseSlot")}
      </h2>

      <p class="important">
        ${explanation}
      </p>

      <div class="actions">

        <button
          class="secondary"
          id="back"
        >
          ${tr("back")}
        </button>

      </div>
      `;

    document
      .querySelector(
        "#back"
      )
      .addEventListener(
        "click",
        renderOrder
      );

    return;
  }


  // ----------------------------------------------------------
  // Group slots by date
  // ----------------------------------------------------------

  const groups =
    visibleSlots.reduce(
      (all, slot) => {

        const date =
          slot.slice(0, 10);

        if (!all[date]) {
          all[date] = [];
        }

        all[date].push(slot);

        return all;
      },
      {}
    );


  const specialNote =
    state.lang === "zh"
      ? `
        <p class="muted">
          為配合屯門醫院服務時間及兩地交通，
          不同的理工掃描時段有指定的掃描先後次序。
          以下只顯示適合你所選次序的可預約時間。
        </p>
      `
      : `
        <p class="muted">
          To allow for Tuen Mun Hospital operating hours
          and travel between the two locations,
          each PolyU time has a planned scan order.
          Only available times compatible with your selected
          order are shown below.
        </p>
      `;


  app.innerHTML =
    `
    <h2>
      ${tr("chooseSlot")}
    </h2>

    ${specialNote}

    ${
      message
        ? `
          <p class="error">
            ${message}
          </p>
        `
        : ""
    }

    <div id="slots"></div>

    <div class="actions">

      <button
        class="secondary"
        id="back"
      >
        ${tr("back")}
      </button>

    </div>
    `;


  const container =
    document.querySelector(
      "#slots"
    );


  Object
    .entries(groups)
    .forEach(
      ([date, slots]) => {

        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="date-group">

            <h3>
              ${dateLabel(date)}
            </h3>

            <div class="slot-grid">

              ${
                slots
                  .map(
                    slot =>
                      `
                      <button
                        class="choice"
                        type="button"
                        data-slot="${esc(slot)}"
                      >
                        ${esc(
                          slotParts(slot).time
                        )}
                      </button>
                      `
                  )
                  .join("")
              }

            </div>

          </div>
          `
        );
      }
    );


  container.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-slot]"
        );

      if (!button) {
        return;
      }

      state.slot =
        button.dataset.slot;

      renderReview();
    }
  );


  document
    .querySelector(
      "#back"
    )
    .addEventListener(
      "click",
      renderOrder
    );
}


// ============================================================
// WAITLIST
// ============================================================

async function joinWaitlist(
  event
) {

  event.target.disabled =
    true;

  try {

    await api({
      action: "waitlist",
      phone: state.phone
    });

    renderSlots(
      "done"
    );

  } catch (error) {

    if (
      error.code ===
      "SLOTS_AVAILABLE"
    ) {

      state.slots =
        error.result
          .availableSlots;

      renderSlots();

    } else {

      event.target.disabled =
        false;

      app.insertAdjacentHTML(
        "afterbegin",
        `
        <p class="error">
          ${tr("genericError")}
        </p>
        `
      );
    }
  }
}


// ============================================================
// STEP 6 — REVIEW
// ============================================================

function renderReview() {

  state.step =
    "review";

  setProgress(6);

  const {
    date,
    time
  } =
    slotParts(
      state.slot
    );

  const tmhTime =
    suggestedHospitalTime(
      state.slot,
      state.order
    );

  app.innerHTML =
    `
    <h2>
      ${tr("review")}
    </h2>


    <div class="appointment fixed">

      <span>
        ${tr("polyuFixed")}
      </span>

      <strong>
        ${dateLabel(date)}
        <br>
        ${esc(time)}
      </strong>

    </div>


    <div class="appointment suggested">

      <span>
        ${tr("tmhSuggested")}
      </span>

      <strong>
        ${tr("around")}
        ${esc(tmhTime)}
      </strong>

      <small>
        ${tr("hospitalOnly")}
      </small>

    </div>


    <div class="summary">

      <div>
        <strong>
          ${tr("order")}
        </strong>
        <br>
        ${orderLabel(
          state.order
        )}
      </div>

      <div>
        <strong>
          ${tr("incentive")}
        </strong>
        <br>
        ${incentiveText(
          state.order
        )}
      </div>

    </div>


    <div class="actions">

      <button
        class="secondary"
        id="back"
      >
        ${tr("back")}
      </button>

      <button id="confirm">
        ${
          state.changing
            ? tr("confirmChange")
            : tr("confirm")
        }
      </button>

    </div>
    `;


  document
    .querySelector(
      "#back"
    )
    .addEventListener(
      "click",
      renderSlots
    );


  document
    .querySelector(
      "#confirm"
    )
    .addEventListener(
      "click",
      saveBooking
    );
}


// ============================================================
// SAVE BOOKING
// ============================================================

async function saveBooking(
  event
) {

  event.target.disabled =
    true;

  event.target.textContent =
    tr("booking");

  try {

    const result =
      await api({

        action:
          state.changing
            ? "reschedule"
            : "book",

        phone:
          state.phone,

        slot:
          state.slot,

        order:
          state.order,

        acknowledged:
          true
      });


    state.participant.appointment =
      result.appointment;

    state.changed =
      state.changing;

    state.changing =
      false;

    renderConfirmation();

  } catch (error) {

    if (
      error.code ===
      "SLOT_TAKEN"
    ) {

      state.slots =
        error.result
          .availableSlots ||
        [];

      renderSlots(
        tr("taken")
      );

    } else if (
      error.code ===
      "RESCHEDULE_TOO_LATE"
    ) {

      state
        .participant
        .appointment
        .canReschedule =
          false;

      renderConfirmation();

    } else if (
      error.code ===
      "ORDER_REQUIRED"
    ) {

      // Useful if somebody still has an older cached page.
      state.slot = "";

      renderOrder();

    } else {

      event.target.disabled =
        false;

      app.insertAdjacentHTML(
        "afterbegin",
        `
        <p class="error">
          ${tr("genericError")}
        </p>
        `
      );
    }
  }
}


// ============================================================
// PREPARATION LIST ON CONFIRMATION PAGE
// ============================================================

function preparationList() {

  const items =
    state.lang === "zh"

      ? [
          "掃描前至少 2 小時不要進食",

          "掃描當天不要吸煙、飲酒，或飲用咖啡、茶及其他含咖啡因產品",

          "前一晚不要熬夜，保持充足睡眠",

          "避免劇烈運動及強烈情緒激動",

          "必要藥物按醫囑正常服用，並告知研究團隊藥名及劑量",

          "按確認頁所示的屯門醫院建議到達時間安排行程",

          "PolyU 不要提前超過 15 分鐘到達"
        ]

      : [
          "Do not eat for at least 2 hours before scanning",

          "Do not smoke, drink alcohol, or consume coffee, tea or other caffeinated products on the scan day",

          "Do not stay up late; get sufficient sleep",

          "Avoid strenuous exercise and strong emotional excitement",

          "Take medically necessary medication as directed and tell the study team the name and dose",

          "Plan your trip according to the suggested Tuen Mun Hospital arrival time shown on this confirmation",

          "Do not arrive at PolyU more than 15 minutes early"
        ];


  return (
    `<ul>` +
    items
      .map(
        item =>
          `<li>${esc(item)}</li>`
      )
      .join("") +
    `</ul>`
  );
}


// ============================================================
// STEP 7 — CONFIRMATION
// ============================================================

function renderConfirmation() {

  state.step =
    "confirmation";

  setProgress(7);


  const p =
    state.participant;

  const a =
    p.appointment;


  const {
    date,
    time
  } =
    slotParts(
      a.polyuTime
    );


  const hospital =
    slotParts(
      a.tmhTime
    );


  const qr =
    safeUrl(
      a.qr
    );


  const incentiveDetail =
    a.order === "POLYU_FIRST"

      ? (
          state.lang === "zh"

            ? "你的最後一站是屯門醫院，因此 HK$200 將於完成屯門醫院掃描後發放。"

            : "Your final location is Tuen Mun Hospital, so the HK$200 incentive will be provided after completing your hospital scan."
        )

      : (
          state.lang === "zh"

            ? "你的最後一站是香港理工大學，因此 HK$200 將於完成理工掃描後發放。"

            : "Your final location is PolyU, so the HK$200 incentive will be provided after completing your PolyU scan."
        );


  app.innerHTML =
    `
    <h2 class="success">
      ${
        state.changed
          ? tr("changed")
          : tr("confirmed")
      }
    </h2>


    <p class="study-title">
      ${tr("footer")}
    </p>


    <div class="summary">

      <div>
        <strong>
          ${tr("participant")}
        </strong>
        <br>
        ${esc(p.name)}
      </div>

      <div>
        <strong>
          ${tr("order")}
        </strong>
        <br>
        ${orderLabel(a.order)}
      </div>

    </div>


    <div class="appointment fixed">

      <span>
        ${tr("polyuFixed")}
      </span>

      <strong>
        ${dateLabel(date)}
        <br>
        ${esc(time)}
      </strong>

    </div>


    <div class="appointment suggested">

      <span>
        ${tr("tmhSuggested")}
      </span>

      <strong>
        ${tr("around")}
        ${esc(
          hospital.time ||
          a.tmhTime
        )}
      </strong>

      <small>
        ${tr("hospitalOnly")}
      </small>

    </div>


    <address>

      <strong>
        ${tr("polyu")}
      </strong>

      <br>

      ${
        state.lang === "zh"
          ? "Z座地下二樓 ZB216<br>UBSN 神經科學實驗室"
          : "Block Z, Basement 2<br>Room ZB216<br>UBSN Neuroscience Laboratory"
      }

      <br>

      ${tr("contact")}:
      ${esc(
        ASL_CONFIG.POLYU_CONTACT
      )}

    </address>


    <address>

      <strong>
        ${tr("tmh")}
      </strong>

      <br>

      ${
        state.lang === "zh"
          ? "主座地下放射科<br>新界屯門青松觀路23號"
          : "Department of Radiology<br>Ground Floor, Main Block<br>23 Tsing Chung Koon Road, Tuen Mun"
      }

      <br>

      ${tr("contact")}:
      ${esc(
        ASL_CONFIG.TMH_CONTACT
      )}

    </address>


    <p class="important">

      <strong>
        ${tr("travel")}
      </strong>

      <br>

      ${tr("early")}

    </p>


    <section class="preparation">

      <h3>
        ${tr("preparation")}
      </h3>

      ${preparationList()}

    </section>


    <section class="incentive">

      <h3>
        ${tr("incentive")}
      </h3>

      <p>
        <strong>
          ${
            state.lang === "zh"
              ? "完成兩次掃描後可獲 HK$200。"
              : "You will receive HK$200 after completing both scans."
          }
        </strong>
      </p>

      <p>
        ${incentiveDetail}
      </p>

    </section>


    <div class="qr">

      ${
        qr
          ? `
            <img
              src="${esc(qr)}"
              alt="Campus entry QR code"
            >

            <a
              class="button-link"
              href="${esc(qr)}"
              target="_blank"
              rel="noopener"
              download
            >
              ${tr("qrSave")}
            </a>
          `
          : tr("qrMissing")
      }

    </div>


    <div class="actions no-print">

      <button
        onclick="window.print()"
      >
        ${tr("print")}
      </button>

      ${
        a.canReschedule
          ? `
            <button
              class="secondary"
              id="change"
            >
              ${tr("change")}
            </button>
          `
          : ""
      }

    </div>


    ${
      a.incentivePaid

        ? `
          <p class="success">
            ${tr("paid")}
          </p>
        `

        : !a.canReschedule

          ? `
            <p class="muted">
              ${tr("tooLate")}
            </p>
          `

          : ""
    }
    `;


  document
    .querySelector(
      "#change"
    )
    ?.addEventListener(
      "click",
      () => {

        state.changing =
          true;

        state.changed =
          false;

        state.order =
          a.order;

        state.slot =
          "";

        renderOrder();
      }
    );
}


// ============================================================
// LANGUAGE
// ============================================================

document
  .querySelector(
    "#language"
  )
  .addEventListener(
    "click",
    () => {

      state.lang =
        state.lang === "zh"
          ? "en"
          : "zh";

      translatePage();

      const renderers = {
        phone:
          renderPhone,

        participant:
          renderParticipant,

        notices:
          renderNotices,

        order:
          renderOrder,

        slots:
          renderSlots,

        review:
          renderReview,

        confirmation:
          renderConfirmation
      };

      if (
        renderers[state.step]
      ) {
        renderers[state.step]();
      }
    }
  );


// ============================================================
// START
// ============================================================

translatePage();
renderPhone();
