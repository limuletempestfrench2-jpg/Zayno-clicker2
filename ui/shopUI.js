import { upgrades } from "../core/upgrades.js";
import { player } from "../core/player.js";

export function renderShop() {
  const shop = document.getElementById("shop");
  shop.innerHTML = "";

  upgrades.forEach(u => {
    let div = document.createElement("div");
    div.className = "upgrade";
    div.innerText = `${u.name} (${u.cost})`;

    div.onclick = () => {
      if (player.blood >= u.cost) {
        player.blood -= u.cost;
        u.effect();
        u.cost = Math.floor(u.cost * 1.5);
      }
    };

    shop.appendChild(div);
  });
}
