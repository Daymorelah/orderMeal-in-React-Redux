import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:2022' : process.env.PRODUCTION_URL;

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
export const signupUserSuccess = userCreated => ({
  type: actionTypes.AUTH_USER_SUCCESS,
  userCreated,
});

export const authUser = (userDetails, authType) => dispatch => axios
  .post(`${domain}/api/v1/auth/${authType}`, userDetails)
  .then((response) => {
    if (response.status === 201 || response.status === 200) {
      localStorage.setItem('token', response.data.data.token);
      dispatch(signupUserSuccess(response.data.data));
    }
  })
  .catch((error) => {
    if (error.response && error.response.status === 409) {
      return dispatch(clientError(error.response.data.data));
    }
    if (error.response && error.response.status > 499) {
      return dispatch(serverError());
    }
    if (error.message === 'Network Error') {
      return dispatch(noInternet());
    }
    return dispatch(generalError());
  });
