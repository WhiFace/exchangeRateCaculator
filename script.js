const currencyOne = document.getElementById("currency-1");
const amountOne = document.getElementById("amount-1");
const currencyTwo = document.getElementById("currency-2");
const amountTwo = document.getElementById("amount-2");

const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");

// Main function to calculate exchange rate
const calculateRate = async () => {
  // 1. Get the value of each currency

  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  try {
    // 2. Fetch data from exchange rate API
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/06c7aead20146a473dc3dc6c/latest/${currency_one}`
    );
    const data = await response.json();

    const rate = data.conversion_rates[currency_two];
    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountTwo.value = (amountOne.value * rate).toFixed(2);
  } catch (error) {
    // Handle the error appropriately,
    console.error("Error fetching exchange rate:", error);
  }
};

//Event listners
currencyOne.addEventListener("change", calculateRate);
amountOne.addEventListener("input", calculateRate);
currencyTwo.addEventListener("change", calculateRate);
amountTwo.addEventListener("input", calculateRate);

swapEl.addEventListener("click", () => {
  const tempCurr = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempCurr;

  calculateRate();
});

calculateRate();
