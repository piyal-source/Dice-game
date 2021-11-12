'use strict';

// HTML elements initialized
const scoresElem = [document.getElementById("score1"), document.getElementById("score2")];
const currScoresElem = [document.getElementById("curr-score1"), document.getElementById("curr-score2")];
const btnNewGame = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const imgDice = document.querySelector(".img-dice");
const secPlayers = [document.querySelector(".sec-player1"), document.querySelector(".sec-player2")];

// Active player and scores initialized
let activePlayer = 0;
let scores = [0, 0];
let currScore = 0;

// Update all scores when new game begins
function newGame() {
    for (let i = 0; i < 2; i++) {
        currScoresElem[i].textContent = currScore;
        scoresElem[i].textContent = scores[i];
    }
}

newGame();
// Highlight the active player
secPlayers[0].classList.add("sec-highlight");
secPlayers[1].classList.add("sec-other");

// Generate random number between 1 and 6, and show it on dice.
function showRandomNumber() {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    imgDice.src = `images/dice-${randomNum}.png`;
    return randomNum;
}

// Set current score of active player = 0
function updateCurrScore() {
    currScore = 0;
    currScoresElem[activePlayer].textContent = currScore;
}

// Change style when active player changes (Highlight active player)
function changePlayer() {
    secPlayers[activePlayer].classList.remove("sec-highlight");
    secPlayers[activePlayer].classList.add("sec-other");
    activePlayer = Math.abs(activePlayer - 1);
    secPlayers[activePlayer].classList.remove("sec-other");
    secPlayers[activePlayer].classList.add("sec-highlight");
}

// On clicking role dice button
btnRoll.addEventListener("click", function () {
    // Show dice image if hidden in the beginning
    if (imgDice.classList.contains("hidden")) {
        imgDice.classList.remove("hidden");
    }
    const activeDice = showRandomNumber();
    // If dice value is 1, change player and lose current score
    if (activeDice === 1) {
        updateCurrScore();
        changePlayer();
    }
    // Else, add current score and continue
    else {
        currScore += activeDice;
        currScoresElem[activePlayer].textContent = currScore;
    }
});

// On clicking Hold button, update total score and change player
btnHold.addEventListener("click", function () {
    scores[activePlayer] += currScore;
    scoresElem[activePlayer].textContent = scores[activePlayer];
    updateCurrScore();
    changePlayer();
});

// On clicking New Game GamepadButton, reset everything
btnNewGame.addEventListener("click", function () {
    if (activePlayer == 1) {
        changePlayer();
    }
    activePlayer = 0;
    scores = [0, 0];
    currScore = 0;
    newGame();
});