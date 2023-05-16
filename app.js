var diceFaces = [
  "https://bit.ly/dice-unknown",
  "https://bit.ly/dice-one",
  "https://bit.ly/dice-two",
  "https://bit.ly/dice-three",
  "https://bit.ly/dice-four",
  "https://bit.ly/dice-five",
  "https://bit.ly/dice-six",
];

// Cleans up code later
var imageDiceOne = document.getElementById("dice01");
var imageDiceTwo = document.getElementById("dice02");
var audio = document.getElementById("audio");

// Gets a random integer, min & max inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollThatDice() {
  audio.currentTime = 0;
  imageDiceOne.style.animation = "spindice 0.25s";
  setTimeout(function () {
    imageDiceOne.setAttribute("src", diceFaces[getRandomInt(1, 6)]);
  }, 150);

  setTimeout(function () {
    imageDiceOne.style.animation = "none";
  }, 250);
  audio.play();
  imageDiceTwo.style.animation = "spindice 0.25s";
  setTimeout(function () {
    imageDiceTwo.setAttribute("src", diceFaces[getRandomInt(1, 6)]);
  }, 150);

  setTimeout(function () {
    imageDiceTwo.style.animation = "none";
  }, 250);
  audio.play();
}

document.addEventListener("DOMContentLoaded", function (event) {
  rollThatDice();
});
