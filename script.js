let blood = 0;
let bloodPerClick = 1;
let bloodPerSecond = 0;

const score = document.getElementById("score");
const bps = document.getElementById("bps");
const bpc = document.getElementById("bpc");
const minos = document.getElementById("minos");
const sound = document.getElementById("clickSound");

// clic
minos.addEventListener("click", () => {
  blood += bloodPerClick;
  score.textContent = blood;

  sound.currentTime = 0;
  sound.play();
});

// génération automatique (sang/sec)
setInterval(() => {
  blood += bloodPerSecond;
  score.textContent = blood;
}, 1000);

// affichage stats (si tu veux upgrades plus tard)
bps.textContent = bloodPerSecond;
bpc.textContent = bloodPerClick;
