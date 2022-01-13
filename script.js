"use strict";

// Seleccionando elementos
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Puntajes
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

//Dado
const diceEl = document.querySelector(".dice");

// Botones
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Inicializando
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Funcionalidad el dado
btnRoll.addEventListener("click", function () {
  if (playing) {
    console.log("entre");
    // 1. Generar un dado random
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrar el dado
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Chequear si dio 1
    if (dice !== 1) {
      // Agrego el dado al puntaje
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Cambio al otro jugador
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Agrego el puntaje actual al puntaje del jugador actual
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Chequear si el puntaje es >= 100
    if (scores[activePlayer] >= 100) {
      // Terminar el juego
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Cambiar al otro jugador
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
