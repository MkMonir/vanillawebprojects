const main = document.getElementById("main"),
  addUser = document.getElementById("add-user"),
  doubleBtn = document.getElementById("double"),
  showMillionairesBtn = document.getElementById("show-millionaires"),
  sortBtn = document.getElementById("sort"),
  calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
const doubleMoney = function () {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
};

// Sort user by richest
const sortByRichest = function () {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
};

// filter only millionaires
const showMillionaires = function () {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
};

// Add new obg to data array
const addData = function (obj) {
  data.push(obj);
  updateDOM();
};

// Calculate the total wealth
const calculateWealth = function () {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

// Update DOM
const updateDOM = function (providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listner
addUser.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
