import { player } from "../core/player.js";

export function click(minos) {
  let gain = player.bpc;

  // crit
  if (Math.random() < 0.1) {
    gain *= 5;
  }

  player.blood += gain;

  minos.style.transform = "scale(1.2)";
  setTimeout(() => minos.style.transform = "scale(1)", 100);
}
