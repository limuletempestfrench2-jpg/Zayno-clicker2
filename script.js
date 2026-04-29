let blood = 0;
let bpc = 1;
let bps = 0;

const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");
const minos = document.getElementById("minos");
const shopDiv = document.getElementById("shop");
const eventBox = document.getElementById("eventBox");
const sound = document.getElementById("clickSound");

// UPGRADES
let upgrades = [
  {name:"Griffes", type:"click", power:1, cost:10, desc:"+1 clic"},
  {name:"Poing", type:"click", power:2, cost:50, desc:"+2 clic"},
  {name:"Fureur", type:"click", power:5, cost:150, desc:"+5 clic"},
  {name:"Colère", type:"click", power:10, cost:500, desc:"+10 clic"},

  {name:"Goutte", type:"auto", power:1, cost:25, desc:"+1/sec"},
  {name:"Flux", type:"auto", power:3, cost:100, desc:"+3/sec"},
  {name:"Rituel", type:"auto", power:8, cost:300, desc:"+8/sec"},
  {name:"Autel", type:"auto", power:20, cost:800, desc:"+20/sec"},
  {name:"Machine", type:"auto", power:50, cost:2000, desc:"+50/sec"},
  {name:"Cœur", type:"auto", power:150, cost:5000, desc:"+150/sec"},
];

// CLICK
minos.onclick = () => {
  blood += bpc;
  updateUI();

  sound.currentTime = 0;
  sound.play();
};

// PASSIVE
setInterval(() => {
  blood += bps;
  updateUI();
}, 1000);

// EVENTS
setInterval(() => {
  let r = Math.random();

  if (r < 0.3) {
    eventBox.textContent = "⚡ OVERDRIVE x3";
    bpc *= 3;
    bps *= 3;

    setTimeout(() => {
      bpc /= 3;
      bps /= 3;
      eventBox.textContent = "Aucun événement";
    }, 60000);
  }

  if (r > 0.7) {
    eventBox.textContent = "💀 APOCALYPSE x10";
    bpc *= 10;
    bps *= 10;

    setTimeout(() => {
      bpc /= 10;
      bps /= 10;
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
}

// INIT
renderShop();
updateUI();
