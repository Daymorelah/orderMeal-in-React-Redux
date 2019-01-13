import * as actionTypes from '../actions/actionTypes';

export default (
  state = {
    userDetails: {}, message: null, isAuthenticated: false, status: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        userDetails: action.userCreated.data,
        message: action.userCreated.message,
        isAuthenticated: true,
        status: true,
      };
    case actionTypes.CLIENT_ERROR:
    case actionTypes.NO_INTERNET:
    case actionTypes.SERVER_ERROR:
    case actionTypes.GENERAL_ERROR:
      return {
        ...state,
        message: action.message,
        status: false,
      };
    default:
      return state;
  }
};
