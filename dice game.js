'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const nameContainer = document.querySelectorAll('.name');

let scores, currentScore, activePlayer, playing;

//Starting condition

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  currentScore0.classList.remove('hidden');
  currentScore1.classList.remove('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = 1 - activePlayer;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //swtich to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //Add score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check winner
    if (scores[activePlayer] >= 100) {
      //end game
      playing = false;

      //css change to winner player's container
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //remove active player css
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //change name of winner player
      nameContainer[activePlayer].textContent = 'WINNER';

      //change currnt score backgroundColor
      //document.querySelectorAll('.current')[activePlayer].style.backgroundColor = 'Aquamarine';

      //change name of loser player
      nameContainer[1 - activePlayer].textContent = '👎   😢';
      //hide  dice
      diceEl.classList.add('hidden');
    } else switchPlayer(); //switvh player
  }
});

btnNew.addEventListener('click', init);
