import { words } from './vocab.js';

const title = document.querySelector('#title');
const button = document.querySelector('button');
const instructions = document.getElementById('instructions');
const wordContainer = document.querySelector('#word-container');
const guessesContainer = document.querySelector('#guesses-container');
const incorrectGuesses = document.getElementById('incorrect-guesses');
const incorrectLetters = document.getElementById('incorrect-letters');
const fawkes = document.querySelector('#fawkes');
const fawkesChomp1 = document.getElementById('fawkes-chomp-1');
const fawkesChomp2 = document.getElementById('fawkes-chomp-2');
const fawkesChomp3 = document.getElementById('fawkes-chomp-3');
const guessesAndFeast = document.getElementById('guesses-and-feast');
const feastTop = document.querySelector('#feast-top');
const feastBottom = document.querySelector('#feast-bottom');
const win = document.querySelector('#win');
const gameOver = document.querySelector('#game-over');
let word;
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
  instructions.style.transform = 'translateY(7vh)';
  fawkes.classList.remove('hidden');
  incorrectGuesses.style.display = 'flex';
  feastTop.classList.remove('hidden');
  feastBottom.classList.remove('hidden');
  setWord();
  setIncorrectGuesses();
  setTimeout(() => window.addEventListener('keyup', handleKeyup), 500);
};

// startGame();

function setWord() {
  word = words[12];
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
  if (!correctGuessesArr.length && !incorrectGuessesArr.length) instructions.style.transform = 'translateY(-7vh)';
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
  // defineWord();
  window.removeEventListener('keyup', handleKeyup);
};

// handleLose();

function handleLose() {
  // guessesContainer.classList.add('hidden');
  fawkesChomp();
  gameOver.classList.remove('hidden');
  window.removeEventListener('keyup', handleKeyup);
};

function fawkesChomp() {
  setTimeout(() => {
    console.log('fawkesPosition: ', fawkesPosition);
    fawkes.classList.add('hidden');
    fawkesChomp1.classList.remove('hidden');
    fawkesChomp1.style.transform = `translateX(${fawkesPosition}vw)`;
  }, 400);
  setTimeout(() => {
    fawkesChomp1.classList.add('hidden');
    fawkesChomp2.style.transform = `translateX(${fawkesPosition}vw)`;
    fawkesChomp2.classList.remove('hidden');
  }, 1000);
  setTimeout(() => {
    fawkesChomp2.classList.add('hidden');
    fawkesChomp3.style.transform = `translateX(${fawkesPosition}vw)`;
    fawkesChomp3.classList.remove('hidden');
    feastTop.style.zIndex = '1';
    feastTop.style.filter = 'none';
    feastTop.style.transform = 'rotate(-32deg) translateY(-7vw)';
  }, 1500);
  setTimeout(() => feastTop.style.transform = 'rotate(-25deg) translateY(-7vw) translateX(-55vw)', 3000);
  setTimeout(() => guessesAndFeast.style.overflow = 'hidden', 3000);
  setTimeout(() => {
    fawkesChomp3.classList.add('hidden');
    fawkesChomp1.classList.remove('hidden');
  }, 4000);
  setTimeout(() => {
    fawkesChomp1.classList.add('hidden');
    fawkes.classList.remove('hidden');
  }, 5000);
}

async function defineWord() {
  const word = 'cider';
  const options = {

  }
  const response = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`, { mode: 'no-cors' })).json();
  console.log('response: ', response);
};

defineWord();