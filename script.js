let blood = 0;
let bpc = 1;
let bps = 0;

let multiplier = 1;

const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");
const minos = document.getElementById("minos");
const eventBanner = document.getElementById("eventBanner");

const clickSound = document.getElementById("clickSound");
const music = document.getElementById("music");
const musicEvent = document.getElementById("musicEvent");

music.volume = 0.5;
music.play();

// CLICK
minos.onclick = () => {
  blood += bpc * multiplier;
  updateUI();

  clickSound.currentTime = 0;
  clickSound.play();
};

// PASSIVE
setInterval(() => {
  blood += bps * multiplier;
  updateUI();
}, 1000);

// UI
function updateUI() {
  bloodEl.textContent = Math.floor(blood);
  bpcEl.textContent = bpc;
  bpsEl.textContent = bps;
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

// déclenche aléatoire toutes les 2-4 min
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

    if (code === "Gh7@Lp9XwR3#Km2Va" && music.volume === 0.67) {
      adminUnlocked = true;
      alert("ADMIN MODE ACTIVATED");
    }
  }
});

// ADMIN POWERS
setInterval(() => {
  if (adminUnlocked) {
    blood += 100000;
    bps += 100;
  }
}, 1000);

// =====================
// 🔄 RESET SYSTEM
// =====================
document.getElementById("resetBtn").onclick = () => {
  let choice = prompt("1 = reset progression\n2 = reset ALL");

  if (choice == 1) {
    blood = 0;
    bps = 0;
    bpc = 1;
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
  localStorage.setItem("blood", blood);
}, 2000);

window.onload = () => {
  blood = Number(localStorage.getItem("blood")) || 0;
  updateUI();
};

// =====================
// 🚫 ANTI INSULTES (simple)
// =====================
function checkToxic(text) {
  const badWords = ["pute", "merde", "con"];
  return badWords.some(w => text.includes(w));
}

function setBio() {
  let bio = prompt("Ta bio:");

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
