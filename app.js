const host = 'https://api.frankfurter.app';

document.addEventListener('DOMContentLoaded', () => {
  const fromCurrencySelect = document.querySelector('.from .currency');
  const toCurrencySelect = document.querySelector('.to .currency');
  const input = document.querySelector('#input');
  const output = document.querySelector('#output');
  const convertButton = document.querySelector('#convert-button');

  // Populate currency select options
  fetch(`${host}/currencies`)
    .then((data) => data.json())
    .then((data) => {
    for (const currency in data) {
  const option = document.createElement('option');
  option.value = currency;
  option.text = `${currency} - ${data[currency]}`;
  fromCurrencySelect.appendChild(option);
}
toCurrencySelect.innerHTML = fromCurrencySelect.innerHTML;
})

  // Convert currency on button click
  convertButton.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = input.value;
  
    fetch(`${host}/latest?amount=1&from=${fromCurrency}&to=${toCurrency}`)
      .then((val) => val.json())
      .then((val) => {
        const conversionRate = Object.values(val.rates)[0];
        const convertedAmount = (conversionRate * amount).toFixed(2); // Round to 2 decimal places
        output.value = convertedAmount;
      });
  });
})  