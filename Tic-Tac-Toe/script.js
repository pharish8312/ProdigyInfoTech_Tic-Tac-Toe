const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function cellClicked(){
  const cellIndex = this.getAttribute("data-index");

  if(board[cellIndex] !== "" || !running){
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index){
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(){
  let roundWon = false;

  for(let condition of winConditions){
    const [a,b,c] = condition;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      roundWon = true;
      break;
    }
  }

  if(roundWon){
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    running = false;
    launchConfetti(); // trigger confetti
  } else if(!board.includes("")){
    statusText.textContent = "🤝 It's a draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame(){
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

// 🎊 Confetti Effect
function launchConfetti(){
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    // create confetti element
    const confetti = document.createElement("div");
    confetti.textContent = "🎉";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-20px";
    confetti.style.fontSize = "24px";
    confetti.style.animation = "fall 2s linear forwards";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);

    if(Date.now() < end){
      requestAnimationFrame(frame);
    }
  }());
}

// CSS animation for confetti
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(${window.innerHeight}px) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
