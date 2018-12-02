// http://data.fixer.io/api/latest?access_key=5c95e083a4e5f69d8ddd8be7a32fac3a&format=1

const axios = require('axios');

// const getExchangeRate = (to, from) => {
//   return axios.get("http://data.fixer.io/api/latest?access_key=5c95e083a4e5f69d8ddd8be7a32fac3a&format=1").then((response) => {
//     const euro = 1/response.data.rates[from];
//     const rate = euro*response.data.rates[to];
//     return rate;
//   });
// };

const getExchangeRate = async (to, from) => {
  try{
    const response = await axios.get("http://data.fixer.io/api/latest?access_key=5c95e083a4e5f69d8ddd8be7a32fac3a&format=1");
    const euro = 1/response.data.rates[from];
    const rate = euro*response.data.rates[to];
    if (isNaN(rate))
      throw new Error();
    return rate;
  }catch(err){
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

// const getCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//     return response.data.map(country => country.name);
//   });
// };

const getCountries = async currencyCode => {
  try{
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map(country => country.name);
  }catch(err){
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to).then(rate => {
//     convertedAmount = (amount*rate).toFixed(2);
//     return getCountries(to);
//   }).then(countries => `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries}.`);
// };

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (amount*rate).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries}.`;
};

// getExchangeRate("USD", "INR").then(rate => {
//   console.log(rate);
// });
//
// getCountries("EUR").then(countries => {
//   console.log(countries);
// });

convertCurrency("USD", "INR", 10).then(message => {
  console.log(message);
}).catch(err => {
  console.log(err.message);
});
