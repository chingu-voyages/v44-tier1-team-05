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
let darkLightButton = document.getElementById("dark-light-btn");
let imageDiceOne = document.getElementById("dice01");
let imageDiceTwo = document.getElementById("dice02");
let displayDice = document.querySelector(".diceResult");
let audio = document.getElementById("audio");
let squares = document.querySelectorAll(".box");
let startMessage = document.getElementById("start");
let errorMessage = document.getElementById("error");
let divArray = Array.from(squares);
//create variables for wins and losses
let fullGridWins = 0;
let fullGridLosses = null;

//Start game with buttons disabled.
disableButtons();

// Add an event listener to the initial button
playButton.addEventListener("click", function () {
  document.querySelector(".message-container").classList.add("hidden");
  // Enable the four buttons
  enableButtons();
  //End previous Timer
  stopTimer();
  //Begin Timer
  startCount();
  //Clear the messages
  clearMessages();
});

// add event listener to rollDice button
rollD.addEventListener("click", function (event) {
  document.querySelector(".message-container").classList.add("hidden");
  rollThatDice();
});

// Attach the function to the button's click event
clearButton.addEventListener("click", function () {
  clearGrid();
  errorMessage.textContent = "Grid cleared!";
});

// Ass event listener to skip button
skipButton.addEventListener("click", function () {
  skipTurn();
  console.log(skipCount);
  displayTotalScores();
});

// Add event listener to submit button
submitButton.addEventListener("click", function () {
  checkAnswer();
  fullGridCheck();
  displayTotalScores();
});

function enableButtons() {
  //Enable the four buttons
  rollD.disabled = false;
  clearButton.disabled = false;
  newGameButton.disabled = false;
  skipButton.disabled = false;
  submitButton.disabled = false;
}

function disableButtons() {
  //Disable the four buttons
  rollD.disabled = true;
  clearButton.disabled = true;
  newGameButton.disabled = true;
  skipButton.disabled = true;
  submitButton.disabled = true;
}
// Add event listeners for dragging
divArray.forEach((square) => {
  square.addEventListener("mousedown", startDrag);
  square.addEventListener("mouseover", drag);
  square.addEventListener("mouseup", endDrag);
  square.addEventListener("click", markOnClick);
});

// Function to handle click event on grid cells
function markOnClick(event) {
  if (!isDragging) {
    markSquare(event.target);
  }
}
// Variables to track dragging state
let isDragging = false;
let startSquare = null;
let endSquare = null;

// Function to handle start of dragging
function startDrag(event) {
  isDragging = true;
  startSquare = event.target;
  endSquare = event.target;
  markSquare(startSquare);
}

// Function to handle dragging over squares
function drag(event) {
  if (isDragging) {
    endSquare = event.target;
    markSquare(endSquare);
  }
}

// Function to handle end of dragging
function endDrag() {
  isDragging = false;
}

function clearMessages() {
  //Clear PLAY message
  startMessage.textContent = "";
  // Clear the error message
  errorMessage.textContent = "";
}

// declare global variables for timer
let timeResults = [];
let interval;

// function sets minutes and seconds
function startTimer(duration, display) {
  stopTimer();
  let timer = duration,
    minutes,
    seconds;

  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      endGame();
      display.textContent = "Time's up!";
      timeResults.push("loss");
      timeUpWinsAndLosses(timeResults);
      displayTotalScores();
    }
  }, 1000);
}

// create a variable to hold the wins and losses
let timeLosses = 0;
let timeWins = 0;

// function to capture time up wins and losses
function timeUpWinsAndLosses(results) {
  timeLosses = 0;
  // loop through the results array
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "loss") {
      timeLosses = timeLosses + 1;
    }
  }
  // display results
  document.getElementById("time-up-loss").textContent = timeLosses;
}

// add the countdown time to the HTML page and start regressive time
function startCount() {
  let duration = 60 * 2; // transform seconds to minutes
  let display = document.querySelector("#countdown");
  startTimer(duration, display);
}

// function to stop the countdown and reset the timer
function stopTimer() {
  clearInterval(interval);
  let display = document.querySelector("#countdown");
  display.textContent = "00:00";
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
  displayDice.innerHTML = diceOneValue + " x " + diceTwoValue;

  // Disable roll dice button
  rollD.disabled = true;
}

rollD.addEventListener("click", function (event) {
  rollThatDice();
});

// Add event listener to new game button
newGameButton.addEventListener("click", function () {
  // Check if any squares are marked as occupied
  const occupiedSquares = document.querySelectorAll(".block");
  console.log(occupiedSquares);
  if (occupiedSquares.length > 0) {
    // Display modal alert
    if (
      confirm(
        "Are you sure you want to start a new game? The current game will be abandoned."
      )
    ) {
      // User confirmed, proceed with starting a new game
      clearGrid();
      rollThatDice();
      emptyLeaderboard();
      window.location.reload();
    } else {
      // User cancelled, do nothing
      return;
    }
  } else {
    // No occupied squares, start a new game directly
    clearGrid();
    rollThatDice();
    emptyLeaderboard();
    window.location.reload();
  }
});

// Define the markSquare() function here
function markSquare(square) {
  document.getElementById("error").textContent = "";
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
  let filterWord = divArray.filter(function (elemento) {
    return elemento.classList.contains("occupied");
  });
  console.log(filterWord);
  if (filterWord.length !== dice1 * dice2) {
    document.querySelector(".message-container").classList.remove("hidden");
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
    document.querySelector(".message-container").classList.remove("hidden");
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

function fullGridCheck() {
  //Check to see if grid is full
  var numBlockedSquares = divArray.filter(function (elemento) {
    return elemento.classList.contains("block");
  });

  squares.forEach((square) => {
    if (numBlockedSquares.length >= 100) {
      document.querySelector(".message-container").classList.remove("hidden");
      //Display win message
      document.getElementById("error").textContent =
        "Congratulations! You have won the game! Press the PLAY button to play again.";

      //stop time
      stopTimer();
      // Tally the win count
      fullGridWinsAndLosses(numBlockedSquares);
      displayTotalScores();

      // Reset game state
      disableButtons();

      // Clear dice results
      displayDice.innerHTML = "";

      // Reset all squares
      squares.forEach((square) => {
        square.classList.remove("occupied");
        square.classList.remove("block");
      });
    }
  });
}

//Populate leaderboard with the results
function fullGridWinsAndLosses(results) {
  if (results.some((elemento) => elemento.classList.contains("block"))) {
    fullGridWins++;
  }
  document.getElementById("grid-full-wins").textContent = fullGridWins;
}

// this function clears ALL of the grid and stops the timer
function endGame() {
  // Clear dice results
  displayDice.innerHTML = " ";
  // Display NEW GAME message
  if ((document.getElementById("error").textContent = "Good Job!")) {
    document.getElementById("error").textContent = " ";
    startMessage.innerHTML = "Press PLAY to start a NEW GAME!";
  }
  // Stop timer
  stopTimer();
  // Reset game state
  disableButtons();
  // Clear whole game grid
  clearEverything();
}

function clearEverything() {
  squares.forEach((square) => {
    square.classList.remove("occupied");
    square.classList.remove("block");
  });
}

function clearGrid() {
  // Remove the "occupied" class from all the squares
  squares.forEach((square) => {
    square.classList.remove("occupied");
  });

  // Clear the error message
  errorMessage.textContent = "";
  startMessage.textContent = "";
}

function emptyLeaderboard() {
  // Reset the win and loss counts to zero

  document.getElementById("grid-full-wins").textContent = "0";
  document.getElementById("total-wins").textContent = "0";
  document.getElementById("time-up-loss").textContent = "0";
  document.getElementById("two-losses-loss").textContent = "0";
}

// skip turn counter
let skipCount = 0;
let skipArray = [];

//skip button
function skipTurn() {
  //incriment the skip count
  skipCount++;

  // if the skip count is equal to the number of players, end the game
  if (skipCount === 2) {
    skipArray.push("loss");
    skipWinsAndLosses(skipArray);
    stopTimer();
    skipCount = 0;
    clearEverything();
    document.querySelector(".message-container").classList.remove("hidden");
    document.getElementById("error").textContent =
      "You skipped your turn too many times! You have lost the game!";
  } else {
    //Clear grid for next player
    clearGrid();
    document.querySelector(".message-container").classList.remove("hidden");
    // Clear error message
    document.getElementById("error").textContent =
      "You have skipped your turn. Next player, please!";
    // reset dice results
    displayDice.innerHTML = "";
    //enable dice roll button
    rollD.disabled = false;
  }
}

// create a variable to hold the losses
let skipLosses = 0;
let skipWins = 0;

// function to capture time up wins and losses
function skipWinsAndLosses(results) {
  //reset the variables
  skipLosses = 0;
  skipWins = 0;

  // loop through the results array
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "loss") {
      skipLosses++;
    }
  }
  // display results
  document.getElementById("two-losses-loss").textContent = skipLosses;
}

function displayTotalScores() {
  let totalW = fullGridWins - timeLosses - skipLosses;

  document.getElementById("total-wins").textContent = totalW;
}

darkLightButton.addEventListener("click", function () {
  const body = document.querySelector("body");
  body.classList.toggle("dark-mode");
});
