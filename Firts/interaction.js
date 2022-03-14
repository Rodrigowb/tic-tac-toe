console.log('Im live!')
// Save references to html references
// Transform the nodeList into an array
const grids = Array.from(document.querySelectorAll('.grid'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

// Creating the variables for the game
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

// Validade the user action (play only in empty grids)
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

// Change the player turn
function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  // Change to O if its X and X if its O
  if (currentPlayer === 'O') {
    currentPlayer = 'X';
  } else if (currentPlayer === 'X') {
    currentPlayer = 'O';
  }
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`)
}

// Reset the board
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  announcer.innerHTML = '';
  if (currentPlayer === 'O') {
    changePlayer();
  }
  grids.forEach(grid => {
    grid.innerText = '';
    grid.classList.remove('playerX');
    grid.classList.remove('playerO');
    grid.style.backgroundColor = 'aqua'
  });
}

// Announce results
function announce(type) {
  switch (type) {
    case oWon:
      announcer.innerHTML = 'O is the winner';
      break;
    case xWon:
      announcer.innerHTML = 'X is the winner';
      break;
    case tie:
      announcer.innerHTML = 'Tie';
  }
  announcer.classList.remove('hide');
}

// Check winner or tie
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    // Checking if the game still going
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    if (currentPlayer === 'X') {
      announce(xWon);
      isGameActive = false;
      return;
    } else if (currentPlayer === 'O') {
      announce(oWon);
      isGameActive = false;
      return;
    }
  }
  if (!board.includes('')) {
    announce(tie);
  }
}

// Update the grid (main function)
function userAction(grid, index) {
  if (isValidAction(grid) && isGameActive) {
    grid.innerText = currentPlayer;
    grid.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

// Change the color os the square
function changeSquareColor(event) {
  if (isValidAction(event.target) && isGameActive) {
    if (currentPlayer === 'X') {
      event.target.style.backgroundColor = 'blue';
    } else if (currentPlayer === 'O') {
      event.target.style.backgroundColor = 'red';
    }
  }
}

// Event listener to change the grid color
grids.forEach(grid => {
  grid.addEventListener('click', changeSquareColor);
})

// Event listener for clicks on the grid
grids.forEach((grid, index) => {
  grid.addEventListener('click', () => userAction(grid, index));
})

// Event listener to reset the board
resetButton.addEventListener('click', resetBoard);


