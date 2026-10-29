const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const nameX = document.getElementById("nameX");
const nameO = document.getElementById("nameO");

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let finished = false;
let scores = { X: 0, O: 0, draws: 0 };

const wins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function playerName(mark) {
  if (mark === "X") return nameX.value.trim() || "Player 1";
  return nameO.value.trim() || "Player 2";
}

function updateScores() {
  document.getElementById("scoreX").textContent = scores.X;
  document.getElementById("scoreO").textContent = scores.O;
  document.getElementById("draws").textContent = scores.draws;
  document.getElementById("scoreNameX").textContent = playerName("X");
  document.getElementById("scoreNameO").textContent = playerName("O");
}

function checkWinner() {
  for (const line of wins) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      line.forEach(index => cells[index].classList.add("winner"));
      scores[board[a]]++;
      status.textContent = playerName(board[a]) + " wins!";
      finished = true;
      updateScores();
      return true;
    }
  }

  if (board.every(cell => cell !== "")) {
    scores.draws++;
    status.textContent = "It's a draw!";
    finished = true;
    updateScores();
    return true;
  }

  return false;
}

function play(index) {
  if (board[index] || finished) return;

  board[index] = turn;
  cells[index].textContent = turn;

  if (turn === "O") cells[index].classList.add("o");

  if (!checkWinner()) {
    turn = turn === "X" ? "O" : "X";
    status.textContent = playerName(turn) + "'s turn";
  }
}

function newRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  finished = false;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("o", "winner");
  });

  status.textContent = playerName("X") + "'s turn";
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => play(index));
});

document.getElementById("newGame").addEventListener("click", newRound);

document.getElementById("reset").addEventListener("click", () => {
  scores = { X: 0, O: 0, draws: 0 };
  updateScores();
  newRound();
});

[nameX, nameO].forEach(input => {
  input.addEventListener("input", () => {
    updateScores();
    if (!finished) status.textContent = playerName(turn) + "'s turn";
  });
});

updateScores();
newRound();
