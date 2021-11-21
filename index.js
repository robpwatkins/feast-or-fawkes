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
let lettersObj = {};
let lettersArr;
// let totalCorrectGuesses;
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

startGame();

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
      p.classList.add(letter, 'letter', 'blank');
      div.appendChild(p);
    })
  })
  humanSteps = 22 / (Object.keys(lettersObj).length);
};

function handleKeyup(event) {
  const { key } = event;
  if (!lettersArr.includes(key)) return handleIncorrectGuess(key);
  handleCorrectGuess(key);
};

function handleIncorrectGuess(key) {
  if (incorrectGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  guessesLeft--;
  fawkesPosition += 2.75;
  fawkes.style.transform = `translateX(${fawkesPosition}vw)`;
  incorrectGuessesArr.push(key);
  if (guessesLeft == 0) return handleLose();
};

function handleCorrectGuess(key) {
  if (!correctGuessesArr.length) document.querySelectorAll('.letter').forEach(el => el.style.height = 'auto');
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
