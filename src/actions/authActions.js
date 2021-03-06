import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV !== 'production')
  ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL;

export const authUserSuccess = successMessage => ({
  type: actionTypes.AUTH_USER_SUCCESS,
  message: successMessage,
});

/**
 * This method gets called when the signup button gets clicked.
 * @param {object} userDetails - contains details of the
 * user needed for authenticating
 * @param {string} authType - specifies the auth type i.e. login or signup
 */
const authentication = (userDetails, authType) => dispatch => axios
  .post(`${domain}/api/v1/auth/${authType}`, userDetails)
  .then((response) => {
    dispatch(authUserSuccess(response.data));
    return response.data;
  })
  .catch((error) => {
    if (error.response) {
      throw error.response.data;
    }
    if (error.message === 'Network Error') {
      throw new Error('Could not connect to the internet. '
          + 'Please check your connection.');
    }
    throw new Error('Our servers are down. Please try again later.');
  });

export default authentication;
