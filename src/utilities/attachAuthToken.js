import axios from 'axios';
/**
   * Function to attach token to header
   *
   * @param {object} token
   * @returns token
   */
const attachAuthorizationToken = (token) => {
  const injector = axios.create();
  const defaultHeaders = injector.defaults.headers.common || {};

  if (token) {
    defaultHeaders['x-access-token'] = token;
  } else {
    delete defaultHeaders['x-access-token'];
  }

  return injector;
};

export default attachAuthorizationToken;
