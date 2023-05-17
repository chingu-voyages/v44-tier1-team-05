var diceFaces = [
  "https://bit.ly/dice-unknown",
  "https://bit.ly/dice-one",
  "https://bit.ly/dice-two",
  "https://bit.ly/dice-three",
  "https://bit.ly/dice-four",
  "https://bit.ly/dice-five",
  "https://bit.ly/dice-six",
];

let imageDiceOne = document.getElementById("dice01");
let imageDiceTwo = document.getElementById("dice02");
let resultDice = document.querySelector(".diceValue");
let audio = document.getElementById("audio");

// Gets a random integer, min & max inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  result = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(result);
  return result;
}

// Roll dice function
function rollThatDice() {
  audio.currentTime = 0;
  imageDiceOne.style.animation = "spindice 0.25s";

  setTimeout(function () {
    imageDiceOne.setAttribute("src", diceFaces[getRandomInt(1, 6)]);
    let c = result;
  }, 150);

  setTimeout(function () {
    imageDiceTwo.setAttribute("src", diceFaces[getRandomInt(1, 6)]);
    let d = result;
    resultDice.innerHTML = c + " + " + d + " = " + c * d;
  }, 150);

  setTimeout(function () {
    imageDiceOne.style.animation = "none";
  }, 250);

  audio.play();

  imageDiceTwo.style.animation = "spindice 0.25s";
  setTimeout(function () {
    imageDiceTwo.style.animation = "none";
  }, 250);

  audio.play();
}

document.addEventListener("DOMContentLoaded", function (event) {
  rollThatDice();
});
