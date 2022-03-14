console.log('Im live!')
// Save references to html references
// Transform the nodeList into an array
const grids = Array.from(document.querySelectorAll('.grid'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

// Creating the variables for the game
// TODO: create it danamically
let board = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X';
let isGameActive = true;

// Creating the game result options
const xWon = 'playerx_won';
const oWon = 'playero_won';
const tie = 'tie';

// Creating the winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Creating a function to validade the user action (play only in empty grids)
function isValidAction(grid) {
  if (grid.innerText === 'X' || grid.innerText === 'O') {
    return false;
  } else {
    return true
  }
}

// Update the board
function updateBoard(index) {
  board[index] = currentPlayer;
}

// Create a function to change the player
function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  // Change to O if its X and X if its O
  if (currentPlayer === 'O') {
    currentPlayer = 'X';
  } else if (currentPlayer === 'X') {
    currentPlayer = 'O'
  }
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`)
}

// Check if we have a winner
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]]
    // Checking if the game still going
    if (a === '' || b === '' || c === '') {
      continue;
    } else if (a === b || b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    announce(currentPlayer === 'X' ? xWon : oWon);
    isGameActive = false;
    return;
  } else if (!board.includes('')) {
    announce(tie);
  }
}

// Event handler to update the grid 
function userAction(grid, index) {
  if (isValidAction(grid) && isGameActive) {
    grid.innerText = currentPlayer;
    grid.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

// Event listener for clicks on the grid
grids.forEach((grid, index) => {
  grid.addEventListener('click', () => userAction(grid, index));
})

// Create the announce function
