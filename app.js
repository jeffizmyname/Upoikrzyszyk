const board = document.getElementById("board");
const info = document.getElementById("info");
const reset = document.getElementById("reset");
const playCpuButton = document.getElementById("playCpu");
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const humanPlayer = 'X';
const aiPlayer = 'O';
let vsCpu = false;
let currentPlayer = humanPlayer;

createBoard();

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const field = document.createElement("div");
        field.id = i;
        field.innerHTML = ".";
        field.classList.add("field");
        board.appendChild(field);
        field.addEventListener("click", place);
    }
}

function place(e) {
    if (e.target.innerHTML === "." && info.innerHTML === "") {
        e.target.innerHTML = currentPlayer;
        if (checkWin(currentPlayer)) {
            info.innerHTML = currentPlayer === humanPlayer ? "X wins!" : "O wins!";
        } else if (checkDraw()) {
            info.innerHTML = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
            if (vsCpu && currentPlayer === aiPlayer) {
                setTimeout(cpuMove, 500);
            }
        }
    }
}

function cpuMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (board.children[i].innerHTML === ".") {
            board.children[i].innerHTML = aiPlayer;
            let score = minimax(board.children, 0, false);
            board.children[i].innerHTML = ".";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board.children[move].innerHTML = aiPlayer;
    currentPlayer = humanPlayer;
    if (checkWin(aiPlayer)) {
        info.innerHTML = "O wins!";
    }
    if (checkDraw()) {
        info.innerHTML = "It's a draw!";
    }
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(aiPlayer)) {
        return 1;
    } else if (checkWin(humanPlayer)) {
        return -1;
    } else if (checkDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i].innerHTML === ".") {
                board[i].innerHTML = aiPlayer;
                let score = minimax(board, depth + 1, false);
                board[i].innerHTML = ".";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i].innerHTML === ".") {
                board[i].innerHTML = humanPlayer;
                let score = minimax(board, depth + 1, true);
                board[i].innerHTML = ".";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWin(player) {
    return wins.some(combination =>
        combination.every(position => board.children[position].innerHTML === player)
    );
}

function checkDraw() {
    return Array.from(board.children).every(field => field.innerHTML !== ".");
}

reset.addEventListener("click", function () {
    Array.from(board.children).forEach(field => {
        field.innerHTML = ".";
    });
    info.innerHTML = "";
    currentPlayer = humanPlayer;
});

playCpuButton.addEventListener("click", function () {
    vsCpu = true;
    info.innerHTML = "Playing against CPU";
    currentPlayer = humanPlayer;
    reset.click()
});
