import { player } from "../core/player.js";

export function ascend() {
  if (player.blood >= player.ascCost) {
    player.blood = 0;
    player.bpc = 1;
    player.bps = 0;

    player.ascBonus += 0.5;
    player.ascCost *= 2;
  }
}
