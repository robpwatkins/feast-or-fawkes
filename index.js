import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const wordContainer = document.querySelector('#word-container');
const guessesContainer = document.querySelector('#guesses-container');
const guesses = document.querySelector('#guesses');
const win = document.querySelector('#win');
const gameOver = document.querySelector('#game-over');
let lettersArr;
let correctGuessesArr = [];
let guessesLeft = 5;
window.addEventListener('keydown', startGame, { once: true });

function startGame() {
  title.classList.add('hidden');
  subtitle.classList.add('hidden');
  guessesContainer.classList.remove('hidden');
  setWord();
  setTimeout(() => window.addEventListener('keyup', handleKeyup), 500);
};

// startGame();

function setWord() {
  const word = words[79];
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
  if (!lettersArr.includes(key)) {
    guessesLeft--;
    guesses.innerHTML = guessesLeft;
    if (guessesLeft == 0) return handleLose();
  }
  const letterElArr = document.querySelectorAll(`.${key}`);
  letterElArr.forEach(el => {
    if (!el.innerHTML) {
      const textNode = document.createTextNode(key);
      el.appendChild(textNode);
      correctGuessesArr.push(key);
    } else return console.log(`You already guessed '${key}'!`);
  })
  if (correctGuessesArr.length == lettersArr.length) return handleWin();
};

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
