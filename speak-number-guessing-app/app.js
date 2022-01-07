"use-strict";
const msgEl = document.getElementById("msg");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Genarate random number
const getRandomNumber = function () {
  return Math.floor(Math.random() * 100 + 1);
};

const randomNum = getRandomNumber();
console.log(randomNum);

// Speech recognition and game
recognition.start();

// Write what user speaks
const writeMessage = function (msg) {
  msgEl.innerHTML = `
        <div>You said : </div>
        <span class="box">${msg}</span>
    `;
};

// Check msg against number
const checkNumber = function (msg) {
  const num = +msg;

  // check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `
            <div>That is not a valid number</div>
        `;
    return;
  }

  // Check the range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `
        <div>Number must be between 1 - 100</div>
      `;
    return;
  }

  // check number
  if (num === randomNum) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br> It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
};

// Capture user speak
const onSpeak = function (e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
};

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

// Play again
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
