import { combineReducers } from 'redux';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  currentUser: signupReducer
});

export default rootReducer;
