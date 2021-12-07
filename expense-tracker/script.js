"use strict";

const balance = document.getElementById("balance"),
  money_plus = document.getElementById("money-plus"),
  money_minus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// const dummyTransaction = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = function (e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionToDOM(transaction);

    updatevalues();

    updateLocalStorage();

    // Clear inputs
    text.value = "";
    amount.value = "";
  }
};

// Generate random id
const generateId = function () {
  return Math.floor(Math.random() * 100000000);
};

// Add trnsactions to DOM list
const addTransactionToDOM = function (transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const html = `
    <li class="${transaction.amount < 0 ? "minus" : "plus"}">${transaction.text}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onClick="removeTransaction(${
          transaction.id
        })">x</button>
    </li>
  `;

  list.insertAdjacentHTML("beforeend", html);
};

// Update the balance, income and expense
const updatevalues = function () {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.textContent = `$${total}`;
  money_plus.textContent = `$${income}`;
  money_minus.textContent = `$${expense}`;
};

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update localstorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
const init = function () {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updatevalues();
};

init();

// Event listner
form.addEventListener("submit", addTransaction);
