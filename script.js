let blood = 0;
let bpc = 1;
let bps = 0;
let sps = 0;

const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");
const spsEl = document.getElementById("sps");

const minos = document.getElementById("minos");
const shopDiv = document.getElementById("shop");
const sound = document.getElementById("clickSound");

// QUOTES
const quotes = ["JUDGEMENT!", "USELESS!", "DIE!", "PREPARE!", "WEAK!"];

// ANTI SPAM
let activeQuotes = 0;
let lastQuoteTime = 0;

// UPGRADES (propres + sans les 4 derniers)
let upgrades = [
  // CLIC
  {name:"Judgement", type:"click", power:1, cost:10, desc:"+1 sang par clic"},
  {name:"Useless", type:"click", power:2, cost:50, desc:"+2 sang par clic"},
  {name:"Die", type:"click", power:5, cost:150, desc:"+5 sang par clic"},
  {name:"Prepare Thyself", type:"click", power:10, cost:500, desc:"+10 sang par clic"},

  // AUTO
  {name:"Thy End", type:"auto", power:1, cost:25, desc:"+1 sang/sec"},
  {name:"Reckoning", type:"auto", power:3, cost:100, desc:"+3 sang/sec"},
  {name:"Gore", type:"auto", power:8, cost:300, desc:"+8 sang/sec"},
  {name:"Steel", type:"auto", power:20, cost:800, desc:"+20 sang/sec"},
  {name:"Punishment", type:"auto", power:50, cost:2000, desc:"+50 sang/sec"},

  // 🔥 LES 4 DERNIERS REMIS (sans SP supprimés)
  {name:"Wrath", type:"click", power:25, cost:5000, desc:"+25 clic"},
  {name:"Divine Strike", type:"click", power:50, cost:12000, desc:"+50 clic"},
  {name:"Annihilation", type:"auto", power:100, cost:20000, desc:"+100/sec"},
  {name:"Final Judgement", type:"auto", power:250, cost:50000, desc:"+250/sec"}
];

// CLICK
minos.onclick = () => {
  blood += bpc;
  showQuote();
  updateUI();

  sound.currentTime = 0;
  sound.play();
};

// PASSIVE
setInterval(() => {
  blood += bps;
  blood += sps * bpc;
  updateUI();
}, 1000);

// SHOP
function renderShop() {
  shopDiv.innerHTML = "";

  upgrades.forEach((u, i) => {
    let div = document.createElement("div");
    div.className = "upgrade";

    div.innerHTML = `
      <b>${u.name}</b><br>
      Coût: ${u.cost}
      <div class="tooltip">${u.desc}</div>
    `;

    div.onclick = () => buyUpgrade(i);
    shopDiv.appendChild(div);
  });
}

function buyUpgrade(i) {
  let u = upgrades[i];

  if (blood >= u.cost) {
    blood -= u.cost;

    if (u.type === "click") bpc += u.power;
    if (u.type === "auto") bps += u.power;
    if (u.type === "sps") sps += u.power;
    if (u.type === "sp") {
      bpc += u.power;
      bps += u.power;
    }

    u.cost = Math.floor(u.cost * 1.5);
    updateUI();
    renderShop();
  }
}

// UI
function updateUI() {
  bloodEl.textContent = Math.floor(blood);
  bpcEl.textContent = bpc;
  bpsEl.textContent = bps;
  spsEl.textContent = sps;
}

// QUOTES (LIMITÉS)
function showQuote() {
  const now = Date.now();
  if (activeQuotes >= 3) return;
  if (now - lastQuoteTime < 200) return;

  lastQuoteTime = now;
  activeQuotes++;

  const zone = document.querySelector(".center");

  let q = document.createElement("div");
  q.textContent = quotes[Math.floor(Math.random()*quotes.length)];

  q.style.position = "absolute";
  q.style.color = "red";
  q.style.fontSize = "28px";

  q.style.left = (Math.random()*80+10) + "%";
  q.style.top = (Math.random()*80+10) + "%";

  zone.appendChild(q);

  setTimeout(() => {
    q.remove();
    activeQuotes--;
  }, 500);
}

// INIT
renderShop();
updateUI();
