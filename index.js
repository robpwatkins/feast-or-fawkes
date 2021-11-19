import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const button = document.querySelector('button');
const wordContainer = document.querySelector('#word-container');
const guessesContainer = document.querySelector('#guesses-container');
const guesses = document.querySelector('#guesses');
const fawkes = document.querySelector('#fawkes');
const feast = document.querySelector('#feast');
const human = document.querySelector('#human');
const win = document.querySelector('#win');
const gameOver = document.querySelector('#game-over');
let lettersArr;
let correctGuessesArr = [];
let incorrectGuessesArr = [];
let guessesLeft = 7;
let fawkesPosition = 0;
let humanPosition = 0;
let humanSteps;
button.addEventListener('click', startGame);
// window.addEventListener('keydown', startGame, { once: true });

function startGame() {
  title.classList.add('hidden');
  button.classList.add('hidden');
  fawkes.classList.remove('hidden');
  feast.classList.remove('hidden');
  human.classList.remove('hidden');
  setWord();
  setTimeout(() => window.addEventListener('keyup', handleKeyup), 500);
};

// startGame();

function setWord() {
  const word = words[11];
  humanSteps = 30 / word.length;
  lettersArr = word.replace(/ /g, '').split('');
  word.split(' ').forEach(word => {
    const div = document.createElement('div');
    div.classList.add('word');
    wordContainer.appendChild(div);
    word.split('').forEach(letter => {
      const p = document.createElement('p');
      p.classList.add(letter, 'letter');
      div.appendChild(p);
    })
  })
};

function handleKeyup(event) {
  const { key } = event;
  if (!lettersArr.includes(key)) return handleIncorrectGuess(key);
  handleCorrectGuess(key);
};

function handleIncorrectGuess(key) {
  if (incorrectGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  guessesLeft--;
  fawkesPosition += 3;
  fawkes.style.transform = `translateX(${fawkesPosition}vw)`;
  incorrectGuessesArr.push(key);
  if (guessesLeft == 0) return handleLose();
};

function handleCorrectGuess(key) {
  if (correctGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  const letterElArr = document.querySelectorAll(`.${key}`);
  humanPosition -= humanSteps;
  human.style.transform = `translateX(${humanPosition}vw)`;
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
