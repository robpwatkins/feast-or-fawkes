import { words } from './vocab.js';
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const wordContainer = document.querySelector('#word-container');
window.addEventListener('keydown', startGame);

function startGame() {
  title.classList.add('hidden');
  subtitle.classList.add('hidden');
  setWord();
}

function setWord() {
  const word = words[0];
  const p = document.createElement('p');
  const textNode = document.createTextNode(word);
  p.appendChild(textNode);
  wordContainer.appendChild(p);
}