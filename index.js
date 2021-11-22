import { words } from './vocab.js';
const title = document.querySelector('#title');
const button = document.querySelector('button');
const wordContainer = document.querySelector('#word-container');
const guessesContainer = document.querySelector('#guesses-container');
const incorrectGuesses = document.getElementById('incorrect-guesses');
const incorrectLetters = document.getElementById('incorrect-letters');
const fawkes = document.querySelector('#fawkes');
const feast = document.querySelector('#feast');
const human = document.querySelector('#human');
const win = document.querySelector('#win');
const gameOver = document.querySelector('#game-over');
let lettersObj = {};
let lettersArr;
let correctGuessesArr = [];
let incorrectGuessesArr = [];
let guessesLeft = 7;
let fawkesPosition = 0;
button.addEventListener('click', startGame);

function startGame() {
  title.classList.add('hidden');
  button.classList.add('hidden');
  fawkes.classList.remove('hidden');
  incorrectGuesses.style.display = 'flex';
  feast.classList.remove('hidden');
  setWord();
  setIncorrectGuesses();
  setTimeout(() => window.addEventListener('keyup', handleKeyup), 500);
};

// startGame();

function setWord() {
  const word = words[12];
  lettersArr = word.replace(/ /g, '').split('');
  word.split(' ').forEach(word => {
    const div = document.createElement('div');
    div.classList.add('word');
    wordContainer.appendChild(div);
    word.split('').forEach(letter => {
      if (lettersObj[letter]) lettersObj[letter]++;
      else lettersObj[letter] = 1;
      const p = document.createElement('p');
      p.classList.add(letter, 'letter');
      div.appendChild(p);
    })
  })
};

function setIncorrectGuesses() {
  if (!incorrectGuessesArr.length) {
    let count = guessesLeft;
    while (count > 0) {
      const p = document.createElement('p');
      p.classList.add('incorrect-letter');
      incorrectLetters.appendChild(p);
      count--;
    }
  } else {
    const incorrectLetterEl = document.getElementsByClassName('incorrect-letter')[incorrectGuessesArr.length - 1];
    const textNode = document.createTextNode(incorrectGuessesArr[incorrectGuessesArr.length - 1]);
    incorrectLetterEl.appendChild(textNode);
  }
}

function handleKeyup(event) {
  const { key } = event;
  if (!lettersArr.includes(key)) return handleIncorrectGuess(key);
  handleCorrectGuess(key);
};

function handleIncorrectGuess(key) {
  if (incorrectGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  guessesLeft--;
  fawkesPosition += 5;
  fawkes.style.transform = `translateX(${fawkesPosition}vw)`;
  incorrectGuessesArr.push(key);
  setIncorrectGuesses();
  if (guessesLeft == 0) return handleLose();
};

function handleCorrectGuess(key) {
  if (!correctGuessesArr.length) document.querySelectorAll('.letter').forEach(el => el.style.height = 'auto');
  if (correctGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  const letterElArr = document.querySelectorAll(`.${key}`);
  letterElArr.forEach(el => {
    const textNode = document.createTextNode(key);
    el.appendChild(textNode);
    correctGuessesArr.push(key);
  })
  if (correctGuessesArr.length == lettersArr.length) return handleWin();
}

function handleWin() {
  guessesContainer.classList.add('hidden');
  win.classList.remove('hidden');
  window.removeEventListener('keyup', handleKeyup);
};

function handleLose() {
  guessesContainer.classList.add('hidden');
  gameOver.classList.remove('hidden');
  window.removeEventListener('keyup', handleKeyup);
};
