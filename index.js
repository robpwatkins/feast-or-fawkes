import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const wordContainer = document.querySelector('#word-container');
window.addEventListener('keydown', startGame);

function startGame() {
  window.removeEventListener('keydown', startGame);
  title.classList.add('hidden');
  subtitle.classList.add('hidden');
  setWord();
  window.addEventListener('keyup', checkLetter);
}

function setWord() {
  const word = words[3];
  const wordArr = word.split('');
  wordArr.forEach(letter => {
    const p = document.createElement('p');
    p.classList.add(letter);
    wordContainer.appendChild(p);
  })
}

function checkLetter(event) {
  const letter = event.key;
  const letterElArr = document.querySelectorAll(`.${letter}`);
  if (letterElArr.length) {
    letterElArr.forEach(el => {
      const textNode = document.createTextNode(letter);
      el.appendChild(textNode);
    })
  }
}

// startGame();