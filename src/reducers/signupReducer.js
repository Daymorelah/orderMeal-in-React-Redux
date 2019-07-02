import * as actionTypes from '../actions/actionTypes';

export default (
  state = {
    userDetails: {}, message: '', isAuthenticated: false, errorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        userDetails: action.userCreated,
        message: action.userCreated.message,
        isAuthenticated: true,
      };
    case actionTypes.CLIENT_ERROR:
    case actionTypes.NO_INTERNET:
    case actionTypes.SERVER_ERROR:
    case actionTypes.GENERAL_ERROR:
      return {
        ...state,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};
