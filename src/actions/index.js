import USER_LOGIN from './actionTypes';

const userAction = (email, password) => ({ type: USER_LOGIN, email, password });

export default userAction;
