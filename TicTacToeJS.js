// Listing our unchanging variables here \\
const tiles = document.querySelectorAll(".tile");
const playerX = "X";
const playerO = "O";
let turn = playerX;

const boardState = Array(tiles.length);
boardState.fill(null);

// Adding the logic to the HTML buttons/prompts \\
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

// Tiles are now clickable \\
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

// Adds the strike through the winning combination & brings up the playAgain prompt \\
function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

// Logic for switching player turns (as well as switching from X to O) \\
function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index; // pulls from the data-index HTML tag \\
  if (tile.innerText != "") {
    return;
  }

  if (turn === playerX) {
    tile.innerText = playerX;
    boardState[tileNumber - 1] = playerX;
    turn = playerO;
  } else {
    tile.innerText = playerO;
    boardState[tileNumber - 1] = playerO;
    turn = playerX;
  }
  setHoverText();
  checkWinner();
}

// Checking for a winner \\
function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

// Display prompt for who wins (or draws) \\
function gameOverScreen(winnerText) {
  let text = "It's a draw!";
  if (winnerText != null) {
    text = `The winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

// Logic for starting a new game \\
function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = playerX;
  setHoverText();
}

// Declaring the possible combos that will allow for a winner \\
const winningCombinations = [
  // Rows \\
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  // Columns \\
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  // Diagonals \\
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

// Timer Function, reseting on the "Play Again" user prompt \\
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
// "Seconds" variable is set to restart at every instance of 60 \\
// totalSeconds/60 will add one (1) minute for every 60 seconds elapsed \\
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
// Computing function that is the "logic" of the timer \\
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}