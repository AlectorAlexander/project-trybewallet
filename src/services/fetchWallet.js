const fetchWallet = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((api) => api);

export default fetchWallet;
