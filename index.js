import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const wordContainer = document.querySelector('#word-container');
const guessesContainer = document.querySelector('#guessesContainer');
const guesses = document.querySelector('#guesses');
const gameOver = document.querySelector('#game-over');
let wordArr;
let correctGuessesArr = [];
let guessesLeft = 5;
window.addEventListener('keydown', startGame, { once: true });

function startGame() {
  title.classList.add('hidden');
  subtitle.classList.add('hidden');
  guessesContainer.classList.remove('hidden');
  setWord();
  setTimeout(() => window.addEventListener('keyup', handleKeyup), 100);
};

function setWord() {
  const word = words[3];
  wordArr = word.split('');
  wordArr.forEach(letter => {
    const p = document.createElement('p');
    p.classList.add(letter);
    wordContainer.appendChild(p);
  })
};

function handleKeyup(event) {
  const letter = event.key;
  if (!wordArr.includes(letter)) return handleWrongGuess();
  const letterElArr = document.querySelectorAll(`.${letter}`);
  letterElArr.forEach(el => {
    if (!el.innerHTML) {
      const textNode = document.createTextNode(letter);
      el.appendChild(textNode);
      correctGuessesArr.push(letter);
    } else return console.log(`You already guessed '${letter}'!`)
  })
  if (correctGuessesArr.length == wordArr.length) return handleWin();
};

function handleWrongGuess() {
  guessesLeft--;
  guesses.innerHTML = guessesLeft;
  if (guessesLeft == 0) return handleLose();
}

function handleWin() {
  console.log('You win!');
}

function handleLose() {
  guessesContainer.classList.add('hidden');
  gameOver.classList.remove('hidden');
}