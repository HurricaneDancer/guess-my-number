'use strict';
const generateNumber = () => Math.trunc(Math.random() * 20) + 1;

let currentScore = 20;
let highScore = 0;
let secretNumber = generateNumber();

// update the test of the element with the .message class
const updateMessage = message =>
  (document.querySelector('.message').textContent = message);

// update the background color of the body
const updateBackground = color =>
  (document.querySelector('body').style.backgroundColor = color);

// update the element with the score
const updateScore = () =>
  (document.querySelector(
    '.label-score'
  ).textContent = `💯 Score ${currentScore}`);

// reset the game by resetting the secret number, the score to 20, the background color and the message
const resetGame = function () {
  secretNumber = generateNumber();
  currentScore = 20;
  updateScore();
  updateBackground('#222');
  updateMessage('Start guessing...');
};

// if the guess is correct then run the win condition, otherwise reduce the score
const guessChecker = function (guess) {
  if (guess === secretNumber) return winCondition();

  currentScore--;
  updateScore();
  updateMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
};

// if their highscore is greater than current, update it and the screen
const winCondition = function () {
  if (currentScore > highScore) {
    highScore = currentScore;
    document.querySelector(
      '.label-highscore'
    ).textContent = `🥇 Highscore: ${highScore}`;
  }
  document.querySelector('.number').textContent = secretNumber;

  updateMessage('You win!');
  updateBackground('green');
};

// set their score to 0, and update the screen
const loseCondition = function () {
  currentScore = 0;
  updateScore();
  updateBackground('red');
  updateMessage('You lose! Play again?');
};

// validate if their current score is still > 1, otherwise run a lose condition
document.querySelector('.check').addEventListener('click', function () {
  const guess = +document.querySelector('.guess').value;
  if (!guess) return updateMessage('Please guess a number');

  if (currentScore > 1) {
    guessChecker(guess);
  } else {
    loseCondition();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});
