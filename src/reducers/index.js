import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  currentUser: signupReducer,
  menuReducer,
});

export default rootReducer;
