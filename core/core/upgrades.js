import { player } from "./player.js";

export const upgrades = [
  {
    name: "Judgement",
    cost: 10,
    effect: () => player.bpc += 1
  },
  {
    name: "Gore Engine",
    cost: 100,
    effect: () => player.bps += 1
  }
];
