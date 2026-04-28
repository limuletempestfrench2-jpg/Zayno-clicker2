const app = document.querySelector("#app");

app.innerHTML = `
  <style>
    body {
      background: #0a0000;
      color: red;
      font-family: Arial, system-ui, sans-serif;
      text-align: center;
      margin: 0;
    }
    h1 { margin-top: 24px; }
    #score { font-size: 60px; margin: 20px; }
    button {
      background: black;
      color: red;
      border: 1px solid red;
      padding: 10px 20px;
      margin: 10px;
      cursor: pointer;
    }
    .row { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
  </style>

  <h1>Clicker Abyssal</h1>
  <div id="score">0</div>
  <div class="row">
    <button id="click">Cliquer</button>
  </div>

  <h2>Améliorations</h2>
  <div class="row">
    <button id="buy">+1 par clic (coût: <span id="cost">10</span>)</button>
  </div>
`;

let score = 0;
let power = 1;
let cost = 10;

const scoreEl = document.getElementById("score");
const costEl = document.getElementById("cost");
const clickBtn = document.getElementById("click");
const buyBtn = document.getElementById("buy");

function update() {
  scoreEl.textContent = String(Math.floor(score));
  costEl.textContent = String(cost);
}

function clicker() {
  score += power;
  update();
}

function buyUpgrade() {
  if (score < cost) return;
  score -= cost;
  power += 1;
  cost = Math.floor(cost * 1.5);
  update();
}

const upgrades = [
  { name: "Sbire infernal", level: 0, cost: 100, power: 1 },
  { name: "Portail abyssal", level: 0, cost: 500, power: 5 }
];

function save() {
  localStorage.setItem("game", JSON.stringify({ score, power, cost, upgrades }));
}

function load() {
  const raw = localStorage.getItem("game");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (typeof data?.score === "number") score = data.score;
    if (typeof data?.power === "number") power = data.power;
    if (typeof data?.cost === "number") cost = data.cost;
    if (Array.isArray(data?.upgrades)) {
      for (let i = 0; i < Math.min(upgrades.length, data.upgrades.length); i++) {
        const u = data.upgrades[i];
        if (u && typeof u.level === "number") upgrades[i].level = u.level;
      }
    }
  } catch {
    // ignore corrupted saves
  }
}

clickBtn.addEventListener("click", clicker);
buyBtn.addEventListener("click", buyUpgrade);

setInterval(() => {
  score += power * 0.5;
  update();
}, 1000);

setInterval(save, 3000);

load();
update();

