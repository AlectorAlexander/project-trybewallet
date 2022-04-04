import USER_LOGIN from '../actions/actionTypes';

const INITIAL_STATE = {
  user: {},
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    const { email, password } = action;
    return { ...state, email, password };
  }
  default:
    return state;
  }
};

export default UserReducer;
