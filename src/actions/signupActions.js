import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:2022' : process.env.PRODUCTION_URL;

export const noInternet = () => ({
  type: actionTypes.NO_INTERNET,
});
export const serverError = () => ({
  type: actionTypes.SERVER_ERROR,
});
export const clientError = () => ({
  type: actionTypes.CLIENT_ERROR,
});
export const generalError = () => ({
  type: actionTypes.GENERAL_ERROR,
});
export const signupUserSuccess = userCreated => ({
  type: actionTypes.SIGNUP_USER_SUCCESS,
  userCreated,
});

export const signupUser = userDetails => dispatch => axios
  .post(`${domain}/api/v1/auth/signup`, userDetails)
  .then((response) => {
    if (response.status === 201) {
      dispatch(signupUserSuccess(response.data));
    }
  })
  .catch((error) => {
    if (error.response && error.response.status === 409) {
      return dispatch(clientError());
    }
    if (error.response && error.response.status > 499) {
      return dispatch(serverError());
    }
    if (error.message === 'Network Error') {
      return dispatch(noInternet());
    }
    return dispatch(generalError());
  });
