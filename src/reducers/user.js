const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_LOGIN': {
    const { email, password } = action;
    return { email, password };
  }
  default:
    return state;
  }
};

export default user;
