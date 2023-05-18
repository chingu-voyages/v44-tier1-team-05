var diceFaces = [
  "https://bit.ly/dice-unknown",
  "https://bit.ly/dice-one",
  "https://bit.ly/dice-two",
  "https://bit.ly/dice-three",
  "https://bit.ly/dice-four",
  "https://bit.ly/dice-five",
  "https://bit.ly/dice-six",
];

var imageDiceOne = document.getElementById("dice01");
var imageDiceTwo = document.getElementById("dice02");
let displayDice = document.querySelector(".diceResult");
var audio = document.getElementById("audio");

// Gets a random integer, min & max inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Roll dice function
function rollThatDice() {
  audio.currentTime = 0;
  imageDiceOne.style.animation = "spindice 0.25s";
  let diceOneValue = getRandomInt(1, 6);
  setTimeout(function () {
    imageDiceOne.setAttribute("src", diceFaces[diceOneValue]);
    imageDiceOne.setAttribute("data-value", diceOneValue);
  }, 150);

  setTimeout(function () {
    imageDiceOne.style.animation = "none";
  }, 250);
  audio.play();
  imageDiceTwo.style.animation = "spindice 0.25s";
  let diceTwoValue = getRandomInt(1, 6);
  setTimeout(function () {
    imageDiceTwo.setAttribute("src", diceFaces[diceTwoValue]);
    imageDiceTwo.setAttribute("data-value", diceTwoValue);
  }, 150);

  setTimeout(function () {
    imageDiceTwo.style.animation = "none";
  }, 250);
  audio.play();
  displayDice.innerHTML = diceOneValue + " x " + diceTwoValue + " = ";
}

document.addEventListener("DOMContentLoaded", function (event) {
  rollThatDice();
});

// Add event listener to submit button
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {
  checkAnswer();
});

// Define the markSquare() function here
function markSquare(square) {
  if (square.classList.contains("occupied")) {
    square.classList.remove("occupied");
  } else {
    square.classList.add("occupied");
  }
}

function checkAnswer() {
  let dice1 = parseInt(
    document.getElementById("dice01").getAttribute("data-value")
  );
  let dice2 = parseInt(
    document.getElementById("dice02").getAttribute("data-value")
  );
  let markedSquares = document.querySelectorAll(".occupied").length;

  if (markedSquares != dice1 + dice2) {
    // Display error message
    document.getElementById("error").textContent =
      "The number of marked squares doesn't match the numbers on the dice. Please mark the grid to match the dice.";

    // Clear all occupied squares
    let squares = document.querySelectorAll(".occupied");
    squares.forEach((square) => {
      square.classList.remove("occupied");
    });
  } else {
    // Clear error message
    document.getElementById("error").textContent = "Good Job!";

    // Enable all disabled squares
    squares = document.querySelectorAll(".box");
    squares.forEach((square) => {
      if (square.classList.contains("disabled")) {
        square.classList.remove("disabled");
      }
    });
  }
}

function clearGrid() {
  // Get all the grid squares
  const squares = document.querySelectorAll(".box");

  // Remove the "occupied" class from all the squares
  squares.forEach((square) => {
    square.classList.remove("occupied");
  });

  // Clear the error message
  const errorMessage = document.getElementById("error");
  errorMessage.textContent = "";
}

// Attach the function to the button's click event
const clearButton = document.getElementById("clear-btn");
clearButton.addEventListener("click", clearGrid);
