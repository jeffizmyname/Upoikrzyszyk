const board = document.getElementById("board")
const info = document.getElementById("info")
const reset = document.getElementById("reset")
const fields = "";
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let x = []
let o = []
let turn = 0;
let winner;

createBoard()

function createBoard() {
    board.innerHTML = ""
    for(let i = 0; i < 9; i++) {
        const field = document.createElement("div")
        field.id = i
        field.innerHTML = "."
        field.classList.add("field")
        board.appendChild(field)
        field.addEventListener("click", place)
    }
}

function place(e) {
    if (e.target.innerHTML == "." && info.innerHTML == "") {
        if(turn == 1) {
            e.target.innerHTML = "X"
            turn = 0
            x.push(Number(e.target.id))
            x.sort((a, b) => a - b)
        } else if(turn == 0) {
            e.target.innerHTML = "O"
            turn = 1
            o.push(Number(e.target.id))
            o.sort((a, b) => a - b)
        }
    }
    if(checkWin(x)){
        info.innerHTML = "x wins"
    }
    if(checkWin(o)) {
        info.innerHTML = "o wins"
    }
}

function checkWin(board) {
    return wins.some(combination =>
        combination.every(position => board.includes(position))
    );
}

reset.addEventListener('click', function() {
    x = []
    o = []
    createBoard()
    info.innerHTML = ""
})