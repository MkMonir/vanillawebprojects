const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

// Create speech boxes
const crateBox = function (item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
};

data.forEach(crateBox);

// Init speech synth
const meassage = new SpeechSynthesisUtterance();

// Get voices
let voices = [];

const getVoices = function () {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const optionHtml = `
        <option value="${voice.name}">${voice.name} ${voice.lang}</option>
    `;

    voicesSelect.insertAdjacentHTML("beforeend", optionHtml);
  });
};

// Set speech text
function setTextMessage(text) {
  meassage.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(meassage);
}

// Set voice
const setVoice = function (e) {
  meassage.voice = voices.find((voice) => voice.name === e.target.value);
};

// Voice changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", (e) => {
  document.querySelector(".text-box").classList.toggle("show");
});

// Close text box
closeBtn.addEventListener("click", (e) => {
  document.querySelector(".text-box").classList.remove("show");
});

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text btn
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
