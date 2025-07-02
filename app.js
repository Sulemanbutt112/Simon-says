const allBtn = document.querySelectorAll("button");
const h2 = document.querySelector("#lvl");
const upperLeft = document.querySelector(".upper-left");
const upperRight = document.querySelector(".upper-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const resetBtn = document.querySelector(".reset");

let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let score = 0;

let btns = ['upper-left', 'upper-right', 'bottom-left', 'bottom-right'];

resetBtn.addEventListener("click", () => {
    reset();
    h2.innerText = `Game Reset. Press any key to start `;
});

document.addEventListener("keypress", () => {
    if (!start) {
        start = true;
        levelup();
    }
});

let levelup = () => {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random() * 3);
    let randBox = btns[randInd];
    let selectedBtn = document.querySelector(`.${randBox}`);
    gameSeq.push(selectedBtn);
    buttonFlash(selectedBtn);
    score += 10;

}

let buttonFlash = (btn) => {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function check(ind) {

    if (userSeq[ind] === gameSeq[ind]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
            score++;
        }
    } else {
        h2.innerText = `Game Over!\nYour score is ${score}\nPress any key to restart`;
        reset();
    }
}

function buttonPress() {
    buttonFlash(this);
    userSeq.push(this);
    check(userSeq.length - 1);
}

allBtn.forEach(btn => {
    btn.addEventListener("click", buttonPress);
});



function reset() {
    start = false;
    level = 0;
    score = 0;
    gameSeq = [];
    userSeq = [];
}