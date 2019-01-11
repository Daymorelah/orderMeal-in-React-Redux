import * as actionTypes from '../actions/actionTypes';

const signupReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.userCreated),
      ];
    default:
      return state;
  }
};

export default signupReducer;
