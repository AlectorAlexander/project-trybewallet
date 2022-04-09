// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {};

const walle = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET': {
    const { currencies: oldsCu } = action;
    const currencies = Object.keys(oldsCu).filter((coin) => coin !== 'USDT');
    return { currencies };
  }
  default:
    return state;
  }
};

export default walle;
