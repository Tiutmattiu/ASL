const SLOTS = [
  ["A","屯門醫院 10:30–11:00 → 香港理工大學 12:30–13:00"],
  ["B","香港理工大學 13:00–13:30 → 屯門醫院 15:00–15:30"],
  ["C","屯門醫院 13:00–13:30 → 香港理工大學 16:00–16:30"],
  ["D","屯門醫院 13:30–14:00 → 香港理工大學 16:30–17:00"],
  ["E","屯門醫院 14:00–14:30 → 香港理工大學 17:00–17:30"],
  ["F","屯門醫院 14:30–15:00 → 香港理工大學 17:30–18:00"],
  ["G","屯門醫院 15:30–16:00 → 香港理工大學 18:00–18:30"]
];

const app = document.querySelector("#app");

function esc(v=""){
  const x=document.createElement("span");
  x.textContent=v==null?"":String(v);
  return x.innerHTML;
}

async function api(payload){
  const r = await fetch(ASL_CONFIG.WEB_APP_URL,{
    method:"POST",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(payload)
  });
  const j = await r.json();
  if(!j.ok) throw Object.assign(new Error(j.message||"API error"),{code:j.code});
  return j;
}

function render(){
  app.innerHTML = `
    <h2>10月4日臨時候補</h2>
    <div class="important">
      <strong>這是候補登記，不是正式預約。</strong><br>
      目前有數個時段可能臨時釋出。提交後，只有收到研究團隊以電話或 WhatsApp 明確確認，才代表預約成功；未收到確認請不要自行前往。
    </div>

    <form id="standby-form">
      <div class="profile-grid">
        <label>姓名
          <input id="name" required>
        </label>
        <label>電話
          <input id="phone" type="tel" inputmode="tel" required>
        </label>
        <label>年齡
          <input id="age" type="number" min="18" max="40" required>
        </label>
        <label>性別
          <select id="gender" required>
            <option value="">請選擇</option>
            <option value="F">女</option>
            <option value="M">男</option>
            <option value="OTHER">其他</option>
          </select>
        </label>
        <label>身高（cm）
          <input id="height" type="number" min="100" max="250" step="0.1" required>
        </label>
        <label>體重（kg）
          <input id="weight" type="number" min="20" max="300" step="0.1" required>
        </label>
        <label>慣用手
          <select id="handedness" required>
            <option value="">請選擇</option>
            <option value="R">右手</option>
            <option value="L">左手</option>
          </select>
        </label>
      </div>

      <section class="panel">
        <h3>你可以出席哪些安排？</h3>
        <p class="muted">請勾選你可以出席的所有時段；選得越多，越容易安排候補。</p>
        <div class="slot-checks">
          ${SLOTS.map(([id,label])=>`
            <label class="check-row">
              <input type="checkbox" name="slot" value="${id}">
              <span><strong>${id}</strong>　${label}</span>
            </label>
          `).join("")}
        </div>
      </section>

      <label class="check-row">
        <input id="eligible" type="checkbox" required>
        <span>
          我確認自己年齡為 18–40 歲；沒有精神或神經系統疾病病史；沒有 MRI 禁忌（例如心臟起搏器、不能移除的金屬植入物或嚴重幽閉恐懼）；如適用，現時並非懷孕或備孕；並可以在同一天完成兩次 MRI 掃描。
        </span>
      </label>

      <div class="important compact">
        掃描當天需避免吸煙、飲酒、咖啡、茶、能量飲品及其他含咖啡因產品，並在掃描前至少 2 小時不要進食。
      </div>

      <div class="actions">
        <button id="submit" type="submit">提交候補登記</button>
      </div>
      <p id="status"></p>
    </form>
  `;

  document.querySelector("#standby-form").onsubmit = submit;
}

async function submit(e){
  e.preventDefault();
  const preferences=[...document.querySelectorAll('input[name="slot"]:checked')].map(x=>x.value);
  const status=document.querySelector("#status");
  const btn=document.querySelector("#submit");

  if(!preferences.length){
    status.className="error";
    status.textContent="請至少選擇一個可以出席的時段。";
    return;
  }

  btn.disabled=true;
  btn.textContent="提交中…";
  status.textContent="";

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
      eligible:document.querySelector("#eligible").checked
    });

    app.innerHTML=`
      <h2 class="success">候補登記已收到</h2>
      <p>謝謝。<strong>這不是正式預約確認。</strong></p>
      <p>如有適合的空缺，研究團隊會以電話或 WhatsApp 聯絡你並確認兩個固定掃描時間。若未收到明確確認，請不要自行前往。</p>
      <div class="important">研究團隊聯絡：91230084</div>
    `;
  }catch(err){
    btn.disabled=false;
    btn.textContent="提交候補登記";
    status.className="error";
    status.textContent = err.code==="ALREADY_REGISTERED"
      ? "這個電話已經存在於研究名單中。如需更改安排，請直接 WhatsApp 91230084。"
      : "暫時無法提交，請直接 WhatsApp 91230084。";
  }
}

render();