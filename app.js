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
let imageDiceOne = document.getElementById("dice01");
let imageDiceTwo = document.getElementById("dice02");
let displayDice = document.querySelector(".diceResult");
let audio = document.getElementById("audio");
let divElements = document.querySelectorAll(".box");
let divArray = Array.from(divElements);
let previousRow = null;
let previousCol = null;

//Start game with buttons disabled.
disableButtons();

// Add an event listener to the initial button
playButton.addEventListener("click", function () {
  // Enable the four buttons
  enableButtons();
});

function enableButtons() {
  //Enable the four buttons
  rollD.disabled = false;
  clearButton.disabled = false;
  newGameButton.disabled = false;
  submitButton.disabled = false;

  //Clear PLAY message
  const clearStart = document.getElementById("start");
  clearStart.textContent = "";

  // Clear the error message
  const errorMessage = document.getElementById("error");
  errorMessage.textContent = "";
}

function disableButtons() {
  //Disable the four buttons
  rollD.disabled = true;
  clearButton.disabled = true;
  newGameButton.disabled = true;
  submitButton.disabled = true;
}

// function sets minutes and seconds
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  let intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (timer <= 0) {
      clearInterval(intervalId); // Stop the timer when it reaches 0
    } else {
      timer--;
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
  // Check if any squares are marked as occupied
  const occupiedSquares = document.querySelectorAll(".block");
  if (occupiedSquares.length > 0) {
    // Display modal alert
    if (confirm("Are you sure you want to start a new game? The current game will be abandoned.")) {
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
  const currentIndex = divArray.indexOf(square);
  const currentRow = Math.floor(currentIndex / 10);
  const currentCol = currentIndex % 10;
  let lessRow = currentRow - previousRow;
  let lessCol = currentCol - previousCol;

  if (square.classList.contains("occupied")) {
    square.classList.remove("occupied");
  } else {
    if (lessRow === 1 && (lessCol === 1 || lessCol === -1)) {
      square.classList.remove("occupied");
      document.getElementById("error").textContent = "Diagonal Not Allowed";
    } else if (lessRow === -1 && (lessCol === 1 || lessCol === -1)) {
      square.classList.remove("occupied");
      document.getElementById("error").textContent = "Diagonal Not Allowed";
    } else {
      square.classList.toggle("occupied");
    }
    previousRow = currentRow;
    previousCol = currentCol;
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
  console.log(dice1 * dice2, filterWord.length);
  if (filterWord.length !== dice1 * dice2) {
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
    // Enable roll dice button
    rollD.disabled = false;

    // Enable all disabled squares
    squares = document.querySelectorAll(".box");
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
clearButton.addEventListener("click", clearGrid);

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
