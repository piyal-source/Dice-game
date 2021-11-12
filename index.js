'use strict';

// HTML elements initialized
const scoresElem = [document.getElementById("score1"), document.getElementById("score2")];
const currScoresElem = [document.getElementById("curr-score1"), document.getElementById("curr-score2")];
const btnNewGame = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const imgDice = document.querySelector(".img-dice");
const secPlayers = [document.querySelector(".sec-player1"), document.querySelector(".sec-player2")];
const btnChange = document.querySelectorAll(".btn-change");
const hPlayers = [document.getElementById("h-player1"), document.getElementById("h-player2")];

// Active player and scores initialized
let activePlayer = 0;
let scores = [0, 0];
let currScore = 0;
let playing = true;

// Generate random number between 1 and 6, and show it on dice.
function showRandomNumber() {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    imgDice.src = `images/dice-${randomNum}.png`;
    return randomNum;
}

function setCurrScore(x) {
    currScore = x;
    currScoresElem[activePlayer].textContent = currScore;
}

function setScore(player, x) {
    scores[player] = x;
    scoresElem[player].textContent = scores[player];
}

function addClassActive(elem, clsName) {
    elem[activePlayer].classList.add(clsName);
}

function removeClassActive(elem, clsName) {
    elem[activePlayer].classList.remove(clsName);
}

function changePlayer() {
    // Set current score of active player = 0
    setCurrScore(0);
    // Change style when active player changes (Highlight active player)
    removeClassActive(secPlayers, "sec-active");
    activePlayer = Math.abs(activePlayer - 1);
    addClassActive(secPlayers, "sec-active");
}

// On clicking role dice button
btnRoll.addEventListener("click", function () {
    // Show dice image
    imgDice.classList.remove("hidden");
    const activeDice = showRandomNumber();
    // If dice value is 1, change player and lose current score
    if (activeDice === 1) {
        changePlayer();
    }
    // Else, add current score and continue
    else {
        setCurrScore(currScore + activeDice);
    }
});

function win() {
    playing = false;
    // Change style of winner's section
    removeClassActive(secPlayers, "sec-active");
    addClassActive(secPlayers, "winner");
    addClassActive(hPlayers, "white");
    addClassActive(scoresElem, "white");
    // Disable Roll dice and Hold buttons
    for (let i = 0; i < 2; i++) {
        btnChange[i].disabled = true;
    }
    // Show "WINNER" in place of score and the score in current score for the winner.
    setCurrScore(scores[activePlayer]);
    setScore(activePlayer, "WINNER");
}
// On clicking Hold button, update total score and current score, and change player
btnHold.addEventListener("click", function () {
    setScore(activePlayer, scores[activePlayer] + currScore);
    if (scores[activePlayer] >= 100) {
        win();
    }
    else {
        changePlayer();
    }
});

// Update all scores when new game begins
function newGame() {
    imgDice.classList.add("hidden");
    activePlayer = 0;
    currScore = 0;
    addClassActive(secPlayers, "sec-active");
    for (let i = 0; i < 2; i++) {
        currScoresElem[i].textContent = currScore;
        setScore(i, 0);
        btnChange[i].disabled = false;
    }
}
// On clicking New Game GamepadButton, reset everything
btnNewGame.addEventListener("click", function () {
    // If a player won the previous game
    if (!playing) {
        removeClassActive(hPlayers, "white");
        removeClassActive(scoresElem, "white");
        removeClassActive(secPlayers, "winner");
    }
    // If Player 2 is the active player
    if (activePlayer == 1) {
        changePlayer();
    }
    newGame();
});