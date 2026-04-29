let blood = 0;
let bpc = 1;
let bps = 0;
let sps = 0;
let ascensionBonus = 1;

const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");
const spsEl = document.getElementById("sps");

const minos = document.getElementById("minos");
const shopDiv = document.getElementById("shop");
const sound = document.getElementById("clickSound");

// QUOTES
const quotes = ["JUDGEMENT!", "USELESS!", "DIE!"];
let activeQuotes = 0;
let lastQuoteTime = 0;

// UPGRADES
let upgrades = [
  {name:"Judgement", type:"click", power:1, cost:10, desc:"+1 clic"},
  {name:"Reckoning", type:"click", power:3, cost:100, desc:"+3 clic"},
  {name:"Thy End", type:"auto", power:2, cost:50, desc:"+2/sec"},
  {name:"Gore", type:"auto", power:5, cost:200, desc:"+5/sec"},
  {name:"Wrath", type:"click", power:25, cost:5000, desc:"+25 clic"},
  {name:"Divine Strike", type:"click", power:50, cost:12000, desc:"+50 clic"},
  {name:"Annihilation", type:"auto", power:100, cost:20000, desc:"+100/sec"},
  {name:"Final Judgement", type:"auto", power:250, cost:50000, desc:"+250/sec"}
];

// CLICK
minos.onclick = () => {
  blood += bpc * ascensionBonus;
  showQuote();
  updateUI();
  sound.currentTime = 0;
  sound.play();
};

// PASSIVE
setInterval(() => {
  blood += (bps + sps * bpc) * ascensionBonus;
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

    div.onclick = () => buyUpgrade(i, div);
    shopDiv.appendChild(div);
  });
}

function buyUpgrade(i, el) {
  let u = upgrades[i];

  if (blood >= u.cost) {
    blood -= u.cost;

    if (u.type === "click") bpc += u.power;
    if (u.type === "auto") bps += u.power;

    el.classList.add("buy");
    setTimeout(() => el.classList.remove("buy"), 300);

    sound.currentTime = 0;
    sound.play();

    u.cost = Math.floor(u.cost * 1.5);

    updateUI();
    renderShop();
  }
}

// QUOTE
function showQuote() {
  if (activeQuotes >= 1) return;

  activeQuotes++;

  let q = document.createElement("div");
  q.textContent = quotes[Math.floor(Math.random()*quotes.length)];
  q.style.position = "absolute";
  q.style.color = "red";
  q.style.left = (Math.random()*60+20)+"%";
  q.style.top = (Math.random()*60+20)+"%";

  document.querySelector(".center").appendChild(q);

  setTimeout(() => {
    q.remove();
    activeQuotes--;
  }, 500);
}

// ASCENSION
document.getElementById("ascendBtn").onclick = () => {
  document.getElementById("ascensionPanel").style.display = "block";
};

function closeAscend() {
  document.getElementById("ascensionPanel").style.display = "none";
}

function doAscend() {
  blood = 0;
  bpc = 1;
  bps = 0;
  sps = 0;

  ascensionBonus += 0.5;

  closeAscend();
  updateUI();
}

// UI
function updateUI() {
  bloodEl.textContent = Math.floor(blood);
  bpcEl.textContent = bpc;
  bpsEl.textContent = bps;
  spsEl.textContent = sps;
}

// INIT
renderShop();
updateUI();
