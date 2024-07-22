'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

function roll() {
  return Math.trunc(Math.random() * 6) + 1;
}

// Declaring variables
let scores, currentScore, activePlayer, playing;

// Starting conditions
function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
}
init();

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  // if (player0.classList.contains('player--active')) {
  //   player0.classList.remove('player--active');
  //   player1.classList.add('player--active');
  //   current0El.textContent = 0;
  // } else {
  //   player0.classList.add('player--active');
  //   player1.classList.remove('player--active');
  //   current1El.textContent = 0;
  // }
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const rolledNumber = roll();

    // Display dice
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');
    dice.src = `dice-${rolledNumber}.png`;

    // Check for rolled 1
    if (rolledNumber === 1) {
      // Swich to next player
      switchPlayer();
    } else {
      // Add dice to current score
      currentScore += rolledNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Adding current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check is player's score is >= 100
    if (scores[activePlayer] >= 30) {
      // Finsih the game
      playing = false;
      dice.classList.add('hidden');

      // Decalre the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
