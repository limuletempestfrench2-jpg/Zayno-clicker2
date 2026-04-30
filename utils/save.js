import { player } from "../core/player.js";

export function save() {
  localStorage.setItem("save", JSON.stringify(player));
}

export function load() {
  let data = localStorage.getItem("save");
  if (data) {
    Object.assign(player, JSON.parse(data));
  }
}
