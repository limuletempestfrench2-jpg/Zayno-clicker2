import { player } from "./core/player.js";
import { click } from "./systems/clickSystem.js";
import { ascend } from "./systems/ascensionSystem.js";
import { renderShop } from "./ui/shopUI.js";
import { updateUI } from "./ui/ui.js";
import { save, load } from "./utils/save.js";

const minos = document.getElementById("minos");

// CLICK
minos.onclick = () => click(minos);

// PASSIVE
setInterval(() => {
  player.blood += player.bps * player.ascBonus;
}, 1000);

// LOOP UI
setInterval(() => {
  updateUI();
  renderShop();
  save();
}, 200);

// LOAD
load();

// TABS
window.openTab = (tab) => {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");
};

// ASCENSION
window.ascend = ascend;

// PROFILE
window.saveProfile = () => {
  localStorage.setItem("name", document.getElementById("nameInput").value);
  localStorage.setItem("bio", document.getElementById("bioInput").value);
};
