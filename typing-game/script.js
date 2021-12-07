"use strict";

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Fetch WORDS API
// prettier-ignore
const words = ["sigh","tense","airplane","ball","pies","juice","warlike","bad","north","dependent","steer","silver","highfalutin","superficial","quince","eight","feeble","admit","drag","loving","hard","programming","backend","frontend","country","bye","common","over","football","things","winner","member","hide","title","score","everyone","always"
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Focas on text on start
text.focus();

// Setting the difficulty from localstorage or default 'medium'
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty default value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Get random word
const getRandomWord = function () {
  return words[Math.floor(Math.random() * words.length)];
};

// Add word to DOM
const addWordToDOM = function () {
  randomWord = getRandomWord();
  word.textContent = randomWord;
};
addWordToDOM();

const updateScore = function () {
  score++;
  scoreEl.innerHTML = score;
};

// Game over and show end screen
const gameOver = function () {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
`;

  endgameEl.style.display = "flex";
};

const updateTime = function () {
  time--;
  timeEl.textContent = time + "s";

  if (time === 0) {
    clearTimeout(timeInterval);
    // End game
    gameOver();
  }
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Event listners
// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Setting difficulty to loaclstorage
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
