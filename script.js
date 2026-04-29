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
const eventBox = document.getElementById("eventBox");
const sound = document.getElementById("clickSound");

// QUOTES
const quotes = [
  "JUDGEMENT!",
  "USELESS!",
  "DIE!",
  "PREPARE THYSELF!",
  "THY END IS NOW!"
];

// UPGRADES
let upgrades = [
  {name:"Judgement", type:"click", power:1, cost:10, desc:"+1 clic"},
  {name:"Useless", type:"click", power:2, cost:50, desc:"+2 clic"},
  {name:"Die", type:"click", power:5, cost:150, desc:"+5 clic"},
  {name:"Prepare Thyself", type:"click", power:10, cost:500, desc:"+10 clic"},

  {name:"Thy End", type:"auto", power:1, cost:25, desc:"+1/sec"},
  {name:"Reckoning", type:"auto", power:3, cost:100, desc:"+3/sec"},
  {name:"Gore", type:"auto", power:8, cost:300, desc:"+8/sec"},
  {name:"Steel", type:"auto", power:20, cost:800, desc:"+20/sec"},
  {name:"Punishment", type:"auto", power:50, cost:2000, desc:"+50/sec"},

  {name:"SP: Ascension Protocol", type:"sps", power:2, cost:3000, desc:"+2 auto-clic/sec"}
];

// CLICK
minos.onclick = () => {
  blood += bpc;
  showQuote();
  clickEffect();
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

// EVENTS
setInterval(() => {
  let r = Math.random();

  if (r < 0.3) {
    eventBox.textContent = "⚡ OVERDRIVE x3";
    bpc *= 3; bps *= 3;

    setTimeout(() => {
      bpc /= 3; bps /= 3;
      eventBox.textContent = "Aucun événement";
    }, 60000);
  }

  if (r > 0.7) {
    eventBox.textContent = "💀 APOCALYPSE x10";
    bpc *= 10; bps *= 10;

    setTimeout(() => {
      bpc /= 10; bps /= 10;
      eventBox.textContent = "Aucun événement";
    }, 60000);
  }

}, 120000);

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

    u.cost = Math.floor(u.cost * 1.6);
    u.power = Math.floor(u.power * 1.2);

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

// EFFECTS
function clickEffect() {
  let fx = document.createElement("div");

  fx.style.position = "absolute";
  fx.style.width = "20px";
  fx.style.height = "20px";
  fx.style.background = "red";
  fx.style.borderRadius = "50%";
  fx.style.left = "50%";
  fx.style.top = "50%";
  fx.style.transform = "translate(-50%, -50%)";
  fx.style.boxShadow = "0 0 20px red";

  document.body.appendChild(fx);
  setTimeout(() => fx.remove(), 200);
}

function showQuote() {
  const gameZone = document.querySelector(".center");

  let q = document.createElement("div");
  q.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  q.style.position = "absolute";
  q.style.color = "red";
  q.style.fontSize = "28px";
  q.style.fontWeight = "bold";
  q.style.pointerEvents = "none";

  // position RANDOM dans la zone centre
  let x = Math.random() * 80 + 10; // évite bords
  let y = Math.random() * 80 + 10;

  q.style.left = x + "%";
  q.style.top = y + "%";

  gameZone.appendChild(q);

  setTimeout(() => q.remove(), 600);
}
