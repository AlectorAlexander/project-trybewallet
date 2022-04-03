import USER_LOGIN from '../actions/actionTypes';

const INITIAL_STATE = {
  user: {},
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return { ...state, user: action.user };
  }
  default:
    return state;
  }
};

export default UserReducer;
