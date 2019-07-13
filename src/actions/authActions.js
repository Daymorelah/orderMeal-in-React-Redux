import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV !== 'production')
  ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL;

export const noInternet = () => ({
  type: actionTypes.NO_INTERNET,
  message: 'Could not connect to the internet. Please check your connection.'
});

export const serverError = () => ({
  type: actionTypes.SERVER_ERROR,
  message: 'Internal server error. Please try again',
});

export const clientError = response => ({
  type: actionTypes.CLIENT_ERROR,
  message: response.message,
});

export const generalError = () => ({
  type: actionTypes.GENERAL_ERROR,
  message: 'Something awful happened. We will fix this soon.'
});

export const signupUserSuccess = successMessage => ({
  type: actionTypes.AUTH_USER_SUCCESS,
  message: successMessage,
});

/**
 * This method gets called when the signup button gets clicked.
 * @param {object} userDetails - contains details of the
 * user needed for authenticating
 * @param {string} authType - specifies the auth type i.e. login or signup
 */
export const initialSignupProcess = (userDetails, authType) => () => axios
  .post(`${domain}/api/v1/auth/${authType}`, userDetails)
  .then(response => response.data)
  .catch((error) => {
    throw ((error.response && error.response.data)
      || 'Our servers are down. Please try again later.');
  });

/**
 * This method gets called when the signup or login button gets clicked.
 * @param {object} userDetails - contains details of the
 * user needed for authenticating
 * @param {string} authType - specifies the auth type i.e. login or signup
 */
export const authUser = (userDetails, authType) => dispatch => axios
  .post(`${domain}/api/v1/auth/${authType}`, userDetails)
  .then((response) => {
    if (response.data.success) {
      dispatch(signupUserSuccess(response.data.message));
      return true;
    }
  }).catch((error) => {
    if (error.response && error.response.status < 499) {
      dispatch(clientError(error.response.data.data));
      return false;
    }
    if (error.response && error.response.status > 499) {
      dispatch(serverError());
      return false;
    }
    if (error.message === 'Network Error') {
      dispatch(noInternet());
      return false;
    }
    dispatch(generalError());
    return false;
  });
