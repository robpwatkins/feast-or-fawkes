import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const wordContainer = document.querySelector('#word-container');
window.addEventListener('keydown', startGame, { once: true });

function startGame() {
  title.classList.add('hidden');
  subtitle.classList.add('hidden');
  let guesses = 5;
  const word = words[3];
  const wordArr = word.split('');
  setWord(wordArr);
  const doCheckLetter = event => checkLetter(event, guesses);
  setTimeout(() => window.addEventListener('keyup', doCheckLetter), 100);
}

function setWord(wordArr) {
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
