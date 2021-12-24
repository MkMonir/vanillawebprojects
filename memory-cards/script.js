"use strict";

const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("show"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("clear"),
  addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

// Show number of cards
const updateCurrentText = function () {
  currentEl.textContent = `${currentActiveCard + 1}/${cardsEl.length}`;
};

// Create single card in DOM
const createCard = function (data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
      <div class="inner-card">
          <div class="inner-card-front">
              <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
              <p>${data.answer}</p>
          </div>
      </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
};

// Create all cards
const createCards = function () {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
};

createCards();

// Next slide
const nextSlide = function () {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
};

// Prev slide
const prevSlide = function () {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
};

// Get cards from localstrogae
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add cards to localstorage
const setCardData = function (cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
};

/// Event listners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardData(cardsData);
  }
});

// Clear all cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
