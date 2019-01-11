import { combineReducers } from 'redux';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  users: signupReducer
});

export default rootReducer;