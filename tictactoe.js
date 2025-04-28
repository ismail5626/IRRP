const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true; // Track if the game is active

// Create game board cells
gameState.forEach((_, index) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = index;
  board.appendChild(cell);

  // Add event listener after creating the cell
  cell.addEventListener('click', handleCellClick);
});

// Check for winner
const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false; // Stop the game
      return true;
    }
  }

  if (!gameState.includes('')) {
    statusDisplay.textContent = 'It\'s a Draw!';
    gameActive = false; // Stop further moves
    return true;
  }
  return false;
};

// Handle cell click
function handleCellClick(event) {
  if (!gameActive) return; // Prevent moves if game is over
  const cell = event.target;
  const index = cell.dataset.index;
  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (!checkWinner()) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Reset game
resetButton.addEventListener('click', () => {
  gameState.fill('');
  gameActive = true; // Reset game state
  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });
});
