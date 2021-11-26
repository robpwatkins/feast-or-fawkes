import { words } from './vocab.js';
const title = document.querySelector('#title');
const button = document.querySelector('button');
const notifications = document.getElementById('notifications');
const wordContainer = document.querySelector('#word-container');
const keyboard = document.getElementById('keyboard');
const incorrectGuesses = document.getElementById('incorrect-guesses');
const incorrectLetters = document.getElementById('incorrect-letters');
const fawkes = document.querySelector('#fawkes');
const fawkesChomp1 = document.getElementById('fawkes-chomp-1');
const fawkesChomp2 = document.getElementById('fawkes-chomp-2');
const fawkesChomp3 = document.getElementById('fawkes-chomp-3');
const guessesAndFeast = document.getElementById('guesses-and-feast');
const feastTop = document.querySelector('#feast-top');
const feastBottom = document.querySelector('#feast-bottom');
let replay = false;
const definitionDiv = document.getElementById('definition');
let gameOver = false;
let word;
let lettersObj = {};
let lettersArr;
let correctGuessesArr = [];
let incorrectGuessesArr = [];
let guessesLeft = 7;
let fawkesPosition = 0;
button.addEventListener('click', startGame);

function startGame() {
  if (!replay) {
    title.classList.add('hidden');
    button.classList.add('hidden');
    notifications.style.transform = 'translateY(5vh)';
    fawkes.classList.remove('hidden');
    incorrectGuesses.style.display = 'flex';
    feastTop.classList.remove('hidden');
    feastBottom.classList.remove('hidden');
    keyboard.style.display = 'flex';
    setKeyboard();
  }
  notifications.style.transition = 'transform: .5s';
  notifications.style.transform = 'translateY(-7vh)';
  word = '';
  wordContainer.innerHTML = '';
  incorrectLetters.innerHTML = '';
  guessesLeft = 7;
  fawkesPosition = 0;
  fawkes.style.transform = `translateX(${fawkesPosition}vw)`;
  feastTop.style.transform = 'none';
  feastTop.style.transition = 'all 1.5s';
  guessesAndFeast.style.overflow = 'visible';
  correctGuessesArr = [];
  incorrectGuessesArr = [];
  definitionDiv.classList.add('hidden');
  setWord();
  console.log(word);
  setIncorrectGuesses();
  // setTimeout(() => window.addEventListener('keyup', handleKeyup), 500);
};

// startGame();

function setWord() {
  [word] = words.splice(Math.floor(Math.random() * words.length), 1);
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

function setKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  alphabet.split('').forEach(alpha => {
    const p = document.createElement('p');
    p.classList.add('alpha');
    p.innerHTML = alpha;
    p.addEventListener('click', handleKeyPress);
    keyboard.appendChild(p);
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
    let incorrectLetterEl = document.getElementsByClassName('incorrect-letter')[incorrectGuessesArr.length - 1];
    if (!incorrectLetterEl) {
      incorrectLetterEl = document.createElement('p');
      incorrectLetterEl.classList.add('incorrect-letter');
      incorrectLetters.appendChild(incorrectLetterEl);
    }
    const textNode = document.createTextNode(incorrectGuessesArr[incorrectGuessesArr.length - 1]);
    incorrectLetterEl.appendChild(textNode);
  }
}

function handleKeyPress(event) {
  const { innerHTML: key } = event.target;
  if (!correctGuessesArr.length && !incorrectGuessesArr.length) notifications.style.transform = 'translateY(-7vh)';
  if (!lettersArr.includes(key)) return handleIncorrectGuess(key);
  handleCorrectGuess(key);
};


function handleIncorrectGuess(key) {
  if (incorrectGuessesArr.includes(key)) return console.log(`You already guessed '${key}'!`);
  guessesLeft--;
  fawkesPosition += 5;
  if (!gameOver) fawkes.style.transform = `translateX(${fawkesPosition}vw)`;
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
  notifications.style.transition = 'transform .15s';
  notifications.innerHTML = `<p>YOU GUESSED IT!!! </p><p id="play-again"><u>play again</u></p>`;
  notifications.style.transform = 'translateY(5vh)';
  defineWord();
  replay = true;
  const playAgain = document.getElementById('play-again');
  playAgain.addEventListener('click', startGame);
  // window.removeEventListener('keyup', handleKeyup);
  gameOver = false;
};

// handleLose();

function handleLose() {
  // guessesContainer.classList.add('hidden');
  notifications.style.transition = 'transform .15s';
  notifications.innerHTML = 'OH NO!!!';
  notifications.style.transform = 'translateY(5vh)';
  fawkesChomp();
  gameOver = true;
  // const keepGuessing = document.getElementById('keep-guessing');
  // keepGuessing.addEventListener
  // window.removeEventListener('keyup', handleKeyup);
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
  setTimeout(() => guessesAndFeast.style.overflow = 'hidden', 3050);
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
  const response = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)).json();
  const [{ partOfSpeech }] = response[0].meanings;
  const [{ definition }] = response[0].meanings[0].definitions;
  const definitionEl = `
    <div>
      <p style="font-size: 2vw;">(${partOfSpeech})</p>
      <p style="font-size: 1.5vw;">${definition}</p>
    </div>
  `;
  definitionDiv.classList.remove('hidden');
  definitionDiv.innerHTML = definitionEl;
};
