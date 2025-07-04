const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let isXTurn = true;
let boardState = Array(9).fill(null);

const WINNING_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  isXTurn = true;
  boardState = Array(9).fill(null);
  setStatus("Player X's Turn");
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  const currentPlayer = isXTurn ? 'X' : 'O';
  boardState[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    setStatus(`🎉 Player ${currentPlayer} Wins!`);
    endGame();
  } else if (boardState.every(cell => cell !== null)) {
    setStatus("😬 It's a Draw!");
  } else {
    isXTurn = !isXTurn;
    setStatus(`Player ${isXTurn ? 'X' : 'O'}'s Turn`);
  }
}

function checkWin(player) {
  return WINNING_COMBOS.some(combo => {
    return combo.every(index => boardState[index] === player);
  });
}

function setStatus(msg) {
  statusText.innerText = msg;
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

resetBtn.addEventListener('click', startGame);

startGame(); // Start on load
