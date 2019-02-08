import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import menuReducer from './menuReducer';
import orderReducer from './mealsOrderedReducer';

const rootReducer = combineReducers({
  currentUser: signupReducer,
  menuReducer,
  orders: orderReducer,
});

export default rootReducer;
