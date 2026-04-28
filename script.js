let score = 0;

const minos = document.getElementById("minos");
const scoreDisplay = document.getElementById("score");
const sound = document.getElementById("clickSound");

minos.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;

  sound.currentTime = 0; // rejoue direct
  sound.play();
});
