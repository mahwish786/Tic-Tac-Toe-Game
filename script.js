// ==========================
// Element Selectors
// ==========================
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGame-btn");
let messageContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let scoreOEl = document.querySelector("#scoreO");
let scoreXEl = document.querySelector("#scoreX");

// ==========================
// Game State
// ==========================
let turnO = true;
let scoreO = 0;
let scoreX = 0;
let moves = 0;

const winPatterns = [ 
    [0, 1, 2], [3, 4, 5], 
    [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
// ==========================
// Reset and Enable Functions
// ==========================
const resetGame = () => {
    turnO = true;
    moves = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-style", "x-style");
    }
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
// ==========================
// Display Winner or Draw
// ==========================
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msg.className = winner === "O" ? "o-style" : "x-style";
    messageContainer.classList.remove("hide");
    disableBoxes();

    if (winner === "O") {
        scoreO++;
        scoreOEl.innerText = scoreO;
    } else {
        scoreX++;
        scoreXEl.innerText = scoreX;
    }
};
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msg.className = "draw-style";
    messageContainer.classList.remove("hide");
};
// ==========================
// Check Winner or Draw
// ==========================
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos2 && pos3 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    if (moves === 9) {
        showDraw();
    }
};
// ==========================
// Box Click Handler
// ==========================
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-style");
        } else {
            box.innerText = "X";
            box.classList.add("x-style");
        }

        box.disabled = true;
        turnO = !turnO;
        moves++;
        checkWinner();
    });
});
// ==========================
// Button Event Listeners
// ==========================
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
