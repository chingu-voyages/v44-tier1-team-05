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
let playButton = document.getElementById("play-btn");
let clearButton = document.getElementById("clear-btn");
let newGameButton = document.getElementById("newGame-btn");
let submitButton = document.getElementById("submit-btn");
let skipButton = document.getElementById("skip-btn");
let imageDiceOne = document.getElementById("dice01");
let imageDiceTwo = document.getElementById("dice02");
let displayDice = document.querySelector(".diceResult");
let audio = document.getElementById("audio");
let squares = document.querySelectorAll(".box");
let startMessage = document.getElementById("start");
let errorMessage = document.getElementById("error");
let divArray = Array.from(squares);

//Start game with buttons disabled.
disableButtons();

// Add an event listener to the initial button
playButton.addEventListener("click", function () {
  // Enable the four buttons
  enableButtons();
  //Begin Timer
  startCount();
  //Clear the messages
  clearMessages();
});

// add event listener to rollDice button
rollD.addEventListener("click", function (event) {
  rollThatDice();
});

// Add event listener to submit button
submitButton.addEventListener("click", function () {
  checkAnswer();
  // disableButtons();
});

// Add event listener to new game button
newGameButton.addEventListener("click", function () {
  clearGrid();
  // rollThatDice();
  // startCount();
  emptyLeaderboard();
  window.location.reload();
  endGame();
});

function enableButtons() {
  //Enable the four buttons
  rollD.disabled = false;
  clearButton.disabled = false;
  newGameButton.disabled = false;
  submitButton.disabled = false;
}

function disableButtons() {
  //Disable the four buttons
  rollD.disabled = true;
  clearButton.disabled = true;
  newGameButton.disabled = true;
  submitButton.disabled = true;
}

function clearMessages() {
  //Clear PLAY message
  startMessage.textContent = "";

  // Clear the error message
  errorMessage.textContent = "";
}

// declare results as global variable
let timeResults = [];

// function sets minutes and seconds
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  let interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "00:00 Time's up!";
      timeResults.push("loss");
      timeUpWinsAndLosses(timeResults);
      disableButtons();
    }
  }, 1000);
}

// function to capture time up wins and losses
function timeUpWinsAndLosses(results) {
  // create a variable to hold the losses
  let timeLosses = 0;

  // loop through the results array
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "win") {
      timeWins++;
    } else if (results[i] === "loss") {
      timeLosses++;
    }
  }
  // display results
  document.getElementById("time-up-loss").textContent = timeLosses;
}

// add the countdown time to the HTML page and start regressive time
function startCount() {
  let duration = 60; // transform seconds to minutes
  let display = document.querySelector("#countdown");
  startTimer(duration, display);
}

function stopTimer() {
  clearInterval(interval);
}

// Gets a random integer, min & max inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Roll dice function
function rollThatDice() {
  audio.currentTime = 0;
  // clear error message
  document.getElementById("error").textContent = " ";
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

  // Disable roll dice button
  rollD.disabled = true;
}

// Define the markSquare() function here
function markSquare(square) {
  if (square.classList.contains("occupied")) {
    square.classList.remove("occupied");
  } else {
    square.classList.toggle("occupied");
  }
}

function checkAnswer() {
  let dice1 = parseInt(
    document.getElementById("dice01").getAttribute("data-value")
  );
  let dice2 = parseInt(
    document.getElementById("dice02").getAttribute("data-value")
  );
  var filterWord = divArray.filter(function (elemento) {
    return elemento.classList.contains("occupied");
  });

  if (filterWord.length !== dice1 * dice2) {
    // Display error message
    document.getElementById("error").textContent =
      "The number of marked squares doesn't match the numbers on the dice. Please mark the grid to match the dice.";

    // Don't let dice roll happen until correct answer is given
    rollD.disabled = true;

    // Clear all occupied squares
    let squares = document.querySelectorAll(".occupied");
    squares.forEach((square) => {
      square.classList.remove("occupied");
    });
  } else {
    // Clear error message
    document.getElementById("error").textContent = "Good Job!";
    // Enable roll dice button
    enableButtons();

    // Enable all disabled squares
    squares.forEach((square) => {
      if (square.classList.contains("occupied")) {
        square.classList.remove("occupied");
        square.classList.add("block"); // add a block then the user cannot change the square
      }
      if (square.classList.contains("disabled")) {
        square.classList.remove("disabled");
      }
    });
  }
}

// this function clears ALL of the grid and stops the timer
function endGame() {
  // Remove classes from all the squares
  squares.forEach((square) => {
    square.classList.remove("occupied");
    square.classList.remove("block");
  });

  // Clear dice results
  displayDice.innerHTML = " ";
  // Display NEW GAME message
  startMessage.innerHTML = "Press PLAY to start a NEW GAME!";

  // Stop the timer
  stopTimer();
}

function clearGrid() {
  // Remove the "occupied" class from all the squares
  squares.forEach((square) => {
    square.classList.remove("occupied");
  });

  // Clear the error message
  errorMessage.textContent = "";
}

// Attach the function to the button's click event
clearButton.addEventListener("click", function () {
  clearGrid();
});

function emptyLeaderboard() {
  // Reset the win and loss counts to zero
  document.getElementById("time-up-wins").textContent = "0";
  document.getElementById("grid-full-wins").textContent = "0";
  document.getElementById("two-losses-wins").textContent = "0";
  document.getElementById("total-wins").textContent = "0";
  document.getElementById("time-up-loss").textContent = "0";
  document.getElementById("grid-full-loss").textContent = "0";
  document.getElementById("two-losses-loss").textContent = "0";
  document.getElementById("total-loss").textContent = "0";
}
