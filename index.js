'use strict';

const scoresElem = [document.querySelector(".score1"), document.querySelector(".score2")];
const currScoresElem = [document.querySelector(".curr-score1"), document.querySelector(".curr-score2")];
const btnNewGame = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const imgDice = document.querySelector(".img-dice");
const secPlayers = [document.querySelector(".sec-player1"), document.querySelector(".sec-player2")];

let activePlayer = 0;
let scores = [0, 0];
let currScores = [0, 0];

secPlayers[0].classList.add("sec-highlight");
secPlayers[1].classList.add("sec-other");

function newGame() {
    for (let i = 0; i < 2; i++) {
        currScoresElem[i].textContent = currScores[i];
        scoresElem[i].textContent = scores[i];
    }
}

newGame();

function showRandomNumber() {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    imgDice.src = `images/dice-${randomNum}.png`;
    return randomNum;
}

function updateCurrScore() {
    currScores[activePlayer] = 0;
    currScoresElem[activePlayer].textContent = currScores[activePlayer];
}

function changePlayer() {
    secPlayers[activePlayer].classList.remove("sec-highlight");
    secPlayers[activePlayer].classList.add("sec-other");
    activePlayer = Math.abs(activePlayer - 1);
    secPlayers[activePlayer].classList.remove("sec-other");
    secPlayers[activePlayer].classList.add("sec-highlight");
}

btnRoll.addEventListener("click", function () {
    if (imgDice.classList.contains("hidden")) {
        imgDice.classList.remove("hidden");
    }
    const activeDice = showRandomNumber();
    if (activeDice === 1) {
        updateCurrScore();
        changePlayer();
    }
    else {
        currScores[activePlayer] += activeDice;
        currScoresElem[activePlayer].textContent = currScores[activePlayer];
    }
});

btnHold.addEventListener("click", function () {
    scores[activePlayer] += currScores[activePlayer];
    scoresElem[activePlayer].textContent = scores[activePlayer];
    updateCurrScore();
    changePlayer();
});

btnNewGame.addEventListener("click", function () {
    if (activePlayer == 1) {
        changePlayer();
    }
    activePlayer = 0;
    scores = [0, 0];
    currScores = [0, 0];
    newGame();
});