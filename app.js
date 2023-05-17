let diceFaces = [
  "https://bit.ly/dice-unknown",
  "https://bit.ly/dice-one",
  "https://bit.ly/dice-two",
  "https://bit.ly/dice-three",
  "https://bit.ly/dice-four",
  "https://bit.ly/dice-five",
  "https://bit.ly/dice-six",
];
let rollD = document.querySelector("#rollDice");
let imageDiceOne = document.getElementById("dice01");
let imageDiceTwo = document.getElementById("dice02");
let resultDic = document.querySelector(".diceResult01");
let audio = document.getElementById("audio");

// function sets minutes and seconds
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (--timer < 10) {
      timer = duration;
    }
  }, 1000);
}
// add the countdown time to the HTML page and start regressive time
function startCount() {
  let duration = 60 * 2; // transform seconds to minutes
  let display = document.querySelector("#countdown");
  startTimer(duration, display);
}
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
    c = result;
  }, 150);
  setTimeout(function () {
    imageDiceTwo.setAttribute("src", diceFaces[getRandomInt(1, 6)]);
    d = result;
    resultDic.innerHTML = c + " x " + d+" = ";
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

rollD.addEventListener("click", function (event) {
  rollThatDice();
});
