const currencyEl_one = document.getElementById("currency-one"),
  amountEl_one = document.getElementById("amount-one"),
  currencyEl_two = document.getElementById("currency-two"),
  amountEl_two = document.getElementById("amount-two"),
  rateEl = document.getElementById("rate"),
  swap = document.getElementById("swap");

// Fetch exchange rate and update the DOM
const calculate = function () {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.textContent = `1${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

// Event listners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
