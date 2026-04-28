const app = document.querySelector("#app");
const SAVE_KEY = "zayno_clicker_save_v1";
const state = {
  score: 0,
  clickPower: 1,
  baseAutoPerSec: 0,
  upgrades: [
    {
      id: "click",
      name: "+1 par clic",
      desc: "Augmente la puissance du clic.",
      level: 0,
      baseCost: 10,
      costMult: 1.5,
      effect: () => ({ clickPower: 1 })
    },
    {
      id: "imp",
      name: "Sbire infernal",
      desc: "+1 / sec",
      level: 0,
      baseCost: 100,
      costMult: 1.6,
      effect: () => ({ autoPerSec: 1 })
    },
    {
      id: "portal",
      name: "Portail abyssal",
      desc: "+5 / sec",
      level: 0,
      baseCost: 500,
      costMult: 1.65,
      effect: () => ({ autoPerSec: 5 })
    }
  ]
};
function upgradeCost(u) {
  return Math.floor(u.baseCost * Math.pow(u.costMult, u.level));
}
function computeAutoPerSec() {
  let total = state.baseAutoPerSec;
  for (const u of state.upgrades) {
    if (u.id === "imp") total += u.level * 1;
    if (u.id === "portal") total += u.level * 5;
  }
  return total;
}
function computeClickPower() {
  let total = state.clickPower;
  const clickUp = state.upgrades.find((u) => u.id === "click");
  if (clickUp) total += clickUp.level * 1;
  return total;
}
function format(n) {
  const x = Math.floor(n);
  return x.toLocaleString("fr-FR");
}
app.innerHTML = `
  <style>
    :root {
      --bg: #0a0000;
      --fg: #ff3a3a;
      --panel: rgba(0,0,0,0.55);
      --border: rgba(255, 58, 58, 0.45);
    }
    body {
      background: radial-gradient(1200px 600px at 50% 0%, rgba(255,58,58,0.12), transparent 60%), var(--bg);
      color: var(--fg);
      font-family: Arial, system-ui, sans-serif;
      text-align: center;
      margin: 0;
    }
    h1 { margin: 22px 0 10px; letter-spacing: 0.5px; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 18px 14px 30px; }
    .score { font-size: 64px; font-weight: 700; margin: 10px 0 6px; }
    .stats { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin: 10px 0 16px; }
    .stat {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 10px 12px;
      min-width: 170px;
    }
    .stat .k { opacity: 0.9; font-size: 12px; }
    .stat .v { font-size: 18px; font-weight: 700; margin-top: 4px; }
    .row { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
    button {
      background: black;
      color: var(--fg);
      border: 1px solid var(--border);
      padding: 10px 14px;
      border-radius: 12px;
      margin: 0;
      cursor: pointer;
      transition: transform 0.02s ease, opacity 0.1s ease;
    }
    button:active { transform: translateY(1px); }
    button[disabled] { opacity: 0.45; cursor: not-allowed; }
    .clickBtn { font-size: 18px; padding: 14px 22px; }
    .dollWrap { display: grid; place-items: center; margin: 10px 0 4px; }
    .dollBtn {
      border: 0;
      background: transparent;
      padding: 0;
    }
    .doll {
      width: min(340px, 78vw);
      height: auto;
      filter: drop-shadow(0 18px 28px rgba(0,0,0,0.65));
      user-select: none;
      -webkit-user-drag: none;
      cursor: pointer;
      transform: translateZ(0);
    }
    .doll:active { transform: scale(0.99); }
    .floatText {
      position: fixed;
      left: 0;
      top: 0;
      transform: translate(-9999px, -9999px);
      pointer-events: none;
      font-weight: 800;
      color: var(--fg);
      text-shadow: 0 2px 0 rgba(0,0,0,0.7);
      opacity: 0;
      will-change: transform, opacity;
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-top: 12px; }
    .card {
      text-align: left;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px;
    }
    .card h3 { margin: 0 0 6px; font-size: 16px; }
    .muted { opacity: 0.85; font-size: 12px; margin: 0 0 10px; }
    .card .meta { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; font-size: 12px; opacity: 0.95; }
    .footer { margin-top: 14px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
  </style>
  <div class="wrap">
    <h1>Clicker Abyssal</h1>
    <div id="score" class="score">0</div>
    <div class="stats">
      <div class="stat">
        <div class="k">Puissance de clic</div>
        <div id="statClick" class="v">1</div>
      </div>
      <div class="stat">
        <div class="k">Gain / sec</div>
        <div id="statAuto" class="v">0</div>
      </div>
      <div class="stat">
        <div class="k">Total</div>
        <div id="statScore" class="v">0</div>
      </div>
    </div>
    <div class="dollWrap">
      <button id="click" class="dollBtn" aria-label="Cliquer">
        <img class="doll" src="${import.meta.env.BASE_URL}poupee.png" alt="Poupée" />
      </button>
    </div>
    <h2 style="margin: 18px 0 10px;">Améliorations</h2>
    <div id="upgrades" class="grid"></div>
    <div class="footer">
      <button id="save">Sauvegarder</button>
      <button id="reset">Reset</button>
    </div>
  </div>
`;
const el = {
  score: document.getElementById("score"),
  statClick: document.getElementById("statClick"),
  statAuto: document.getElementById("statAuto"),
  statScore: document.getElementById("statScore"),
  upgrades: document.getElementById("upgrades"),
  clickBtn: document.getElementById("click"),
  saveBtn: document.getElementById("save"),
  resetBtn: document.getElementById("reset")
};
function renderUpgrades() {
  el.upgrades.innerHTML = state.upgrades
    .map((u) => {
      const cost = upgradeCost(u);
      const canBuy = state.score >= cost;
      return `
        <div class="card" data-upgrade="${u.id}">
          <h3>${u.name}</h3>
          <p class="muted">${u.desc}</p>
          <div class="meta">
            <div>Niveau: <b>${u.level}</b></div>
            <div>Coût: <b>${format(cost)}</b></div>
          </div>
          <div style="margin-top: 10px;">
            <button class="buy" ${canBuy ? "" : "disabled"}>Acheter</button>
          </div>
        </div>
      `;
    })
    .join("");
}
function updateHUD() {
  const clickPower = computeClickPower();
  const autoPerSec = computeAutoPerSec();
  el.score.textContent = format(state.score);
  el.statClick.textContent = format(clickPower);
  el.statAuto.textContent = format(autoPerSec);
  el.statScore.textContent = format(state.score);
  renderUpgrades();
}
function buyUpgrade(id) {
  const u = state.upgrades.find((x) => x.id === id);
  if (!u) return;
  const cost = upgradeCost(u);
  if (state.score < cost) return;
  state.score -= cost;
  u.level += 1;
  updateHUD();
}
function clicker() {
  state.score += computeClickPower();
  updateHUD();
}
function spawnFloatText(x, y, text) {
  const node = document.createElement("div");
  node.className = "floatText";
  node.textContent = text;
  document.body.appendChild(node);
  const dx = (Math.random() * 2 - 1) * 18;
  const startY = y - 12;
  const endY = y - 70 - Math.random() * 20;
  node.style.opacity = "1";
  node.style.transform = `translate(${x + dx}px, ${startY}px) scale(1)`;
  const duration = 520;
  const t0 = performance.now();
  function anim(t) {
    const p = Math.min(1, (t - t0) / duration);
    const ease = 1 - Math.pow(1 - p, 3);
    const yy = startY + (endY - startY) * ease;
    node.style.opacity = String(1 - p);
    node.style.transform = `translate(${x + dx}px, ${yy}px) scale(${1 + p * 0.15})`;
    if (p < 1) requestAnimationFrame(anim);
    else node.remove();
  }
  requestAnimationFrame(anim);
}
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}
function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (typeof data?.score === "number") state.score = data.score;
    if (typeof data?.clickPower === "number") state.clickPower = data.clickPower;
    if (typeof data?.baseAutoPerSec === "number") state.baseAutoPerSec = data.baseAutoPerSec;
    if (Array.isArray(data?.upgrades)) {
      for (const incoming of data.upgrades) {
        const u = state.upgrades.find((x) => x.id === incoming?.id);
        if (u && typeof incoming.level === "number" && incoming.level >= 0) u.level = incoming.level;
      }
    }
  } catch {
    // ignore corrupted saves
  }
}
function reset() {
  localStorage.removeItem(SAVE_KEY);
  state.score = 0;
  state.clickPower = 1;
  state.baseAutoPerSec = 0;
  for (const u of state.upgrades) u.level = 0;
  updateHUD();
}
el.clickBtn.addEventListener("click", clicker);
el.clickBtn.addEventListener("pointerdown", (e) => {
  const x = "clientX" in e ? e.clientX : window.innerWidth / 2;
  const y = "clientY" in e ? e.clientY : window.innerHeight / 2;
  spawnFloatText(x, y, `+${format(computeClickPower())}`);
});
el.saveBtn.addEventListener("click", save);
el.resetBtn.addEventListener("click", reset);
el.upgrades.addEventListener("click", (e) => {
  const target = /** @type {Element|null} */ (e.target instanceof Element ? e.target : null);
  if (!target) return;
  const btn = target.closest("button.buy");
  if (!btn) return;
  const card = btn.closest("[data-upgrade]");
  if (!card) return;
  buyUpgrade(card.getAttribute("data-upgrade"));
});
let last = performance.now();
function tick(now) {
  const dt = Math.min(0.25, (now - last) / 1000);
  last = now;
  const gain = computeAutoPerSec() * dt;
  if (gain > 0) state.score += gain;
  updateHUD();
  requestAnimationFrame(tick);
}
load();
updateHUD();
requestAnimationFrame(tick);
setInterval(save, 3000);
