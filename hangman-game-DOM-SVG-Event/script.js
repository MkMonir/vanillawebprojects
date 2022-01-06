'use strict';

const wordEl = document.getElementById('word'),
  wrongLettersEl = document.getElementById('wrong-letters'),
  playAgainBtn = document.getElementById('play-button'),
  popup = document.getElementById('popup-container'),
  notification = document.getElementById('notification-container'),
  finalMessage = document.getElementById('final-message'),
  figureParts = document.querySelectorAll('.figure-part');

const words = [
  'application',
  'programming',
  'javascript',
  'developer',
  'sweety',
  'titu',
  'nasrin',
  'lepe',
  'shakil',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show Hidden Word
const displayWord = function () {
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map(
      letter =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.textContent = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
};

// Update the wrong letters
const updateWrongLettersEl = function () {
  // Display wrong latters
  wrongLettersEl.innerHTML = `${
    wrongLetters.length > 0 ? `<p class="wrong-text">Wrong</p>` : ''
  }${wrongLetters.map(
    letter => `<span class="wrong-letter">${letter}</span>`
  )}`;

  // Display parts
  figureParts.forEach((part, i) => {
    const errors = wrongLetters.length;

    if (i < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lose 😐';
    popup.style.display = 'flex';
  }
};

// Show notification
const showNotification = function () {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

// Keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart the game
playAgainBtn.addEventListener('click', e => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  popup.style.display = 'none';

  displayWord();
  updateWrongLettersEl();
});

displayWord();
