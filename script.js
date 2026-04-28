// =====================
// 💰 VARIABLES
// =====================
let blood = 0;
let bpc = 1;
let bps = 0;

let ascensions = 0;
let globalMultiplier = 1;
let multiplier = 1;

let costClick = 10;
let costAuto = 25;

// =====================
// 📦 ELEMENTS
// =====================
const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");

const minos = document.getElementById("minos");
const eventBanner = document.getElementById("eventBanner");

const clickSound = document.getElementById("clickSound");
const music = document.getElementById("music");
const musicEvent = document.getElementById("musicEvent");

// =====================
// 🎵 MUSIQUE
// =====================
music.volume = 0.5;
music.play();

// =====================
// 🖱️ CLICK
// =====================
minos.onclick = () => {
  blood += bpc * multiplier * globalMultiplier;
  updateUI();

  clickSound.currentTime = 0;
  clickSound.play();
};

// =====================
// ⏱️ PASSIVE
// =====================
setInterval(() => {
  blood += bps * multiplier * globalMultiplier;
  updateUI();
}, 1000);

// =====================
// 🛒 SHOP
// =====================
function buyClick() {
  if (blood >= costClick) {
    blood -= costClick;
    bpc++;

    costClick = Math.floor(costClick * 1.5);
    updateUI();
  }
}

function buyAuto() {
  if (blood >= costAuto) {
    blood -= costAuto;
    bps++;

    costAuto = Math.floor(costAuto * 1.6);
    updateUI();
  }
}

// =====================
// 🔁 ASCENSION
// =====================
function ascend() {
  if (blood >= 1000) {
    ascensions++;
    globalMultiplier *= 1.5;

    blood = 0;
    bpc = 1;
    bps = 0;
    costClick = 10;
    costAuto = 25;

    updateUI();
  }
}

// =====================
// 🎲 EVENTS
// =====================
function randomEvent() {
  const roll = Math.random();

  if (roll < 0.5) {
    startEvent("⚡ OVERDRIVE CARNAGE x3 ⚡", 3);
  } else {
    startEvent("💀 BLOOD APOCALYPSE x10 💀", 10);
  }
}

function startEvent(name, multi) {
  multiplier = multi;
  eventBanner.textContent = name;

  music.pause();
  musicEvent.currentTime = 0;
  musicEvent.play();

  setTimeout(() => {
    multiplier = 1;
    eventBanner.textContent = "";

    musicEvent.pause();
    music.play();
  }, 60000);
}

// toutes les 2 minutes chance d’event
setInterval(() => {
  if (Math.random() < 0.5) randomEvent();
}, 120000);

// =====================
// 🔒 ADMIN SECRET
// =====================
let adminUnlocked = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let code = prompt("Enter code:");

    if (code === "Gh7@Lp9XwR3#Km2Va" && Math.round(music.volume * 100) === 67) {
      adminUnlocked = true;
      alert("ADMIN MODE ACTIVATED");
    }
  }
});

// pouvoirs admin
setInterval(() => {
  if (adminUnlocked) {
    blood += 100000;
    bps += 100;
  }
}, 1000);

// =====================
// 🔄 RESET
// =====================
document.getElementById("resetBtn").onclick = () => {
  let choice = prompt("1 = reset progression\n2 = reset ALL");

  if (choice == 1) {
    blood = 0;
    bpc = 1;
    bps = 0;
  }

  if (choice == 2) {
    localStorage.clear();
    location.reload();
  }
};

// =====================
// 💾 SAVE
// =====================
setInterval(() => {
  localStorage.setItem("save", JSON.stringify({
    blood, bpc, bps,
    ascensions, globalMultiplier,
    costClick, costAuto
  }));
}, 2000);

window.onload = () => {
  let save = JSON.parse(localStorage.getItem("save"));

  if (save) {
    blood = save.blood;
    bpc = save.bpc;
    bps = save.bps;
    ascensions = save.ascensions;
    globalMultiplier = save.globalMultiplier;
    costClick = save.costClick;
    costAuto = save.costAuto;
  }

  updateUI();
};

// =====================
// 🚫 ANTI INSULTES
// =====================
function checkToxic(text) {
  const badWords = ["pute", "merde", "con"];
  return badWords.some(w => text.toLowerCase().includes(w));
}

function setBio() {
  let bio = prompt("Ta bio:");

  if (!bio) return;

  if (checkToxic(bio)) {
    alert("⚠️ avertissement");

    if (localStorage.getItem("warned")) {
      alert("RESET TOTAL");
      localStorage.clear();
      location.reload();
    } else {
      localStorage.setItem("warned", true);
    }
  } else {
    localStorage.setItem("bio", bio);
  }
}

// =====================
// 📊 UI UPDATE
// =====================
function updateUI() {
  bloodEl.textContent = Math.floor(blood);
  bpcEl.textContent = bpc;
  bpsEl.textContent = bps;

  document.getElementById("asc").textContent = ascensions;
  document.getElementById("costClick").textContent = costClick;
  document.getElementById("costAuto").textContent = costAuto;
}
