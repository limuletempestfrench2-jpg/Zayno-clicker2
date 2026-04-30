import { player } from "../core/player.js";

export function updateUI() {
  document.getElementById("blood").textContent = Math.floor(player.blood);
  document.getElementById("bpc").textContent = player.bpc;
  document.getElementById("bps").textContent = player.bps;
  document.getElementById("ascCost").textContent = player.ascCost;
}
