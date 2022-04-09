import { combineReducers } from 'redux';
import user from './user';
import walle from './wallet';

const wallet = walle;

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
