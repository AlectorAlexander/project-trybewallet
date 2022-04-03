// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {},
};

const WalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET': {
    return { ...state, user: action.user };
  }
  default:
    return state;
  }
};

export default WalletReducer;
