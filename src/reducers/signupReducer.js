import * as actionTypes from '../actions/actionTypes';

export default (
  state = {
    userDetails: {}, message: '', isAuthenticated: false, status: ''
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
