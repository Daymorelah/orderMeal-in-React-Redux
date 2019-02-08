import attachAuthToken from '../utilities/attachAuthToken';
import * as actionTypes from './actionTypes';

const { token } = JSON.parse(localStorage.getItem('userDetails'));

const domain = (process.env.NODE_ENV !== 'production')
  ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL;

export const placeOrderSuccess = response => ({
  type: actionTypes.PLACE_ORDER_SUCCESS,
  order: response.order,
});

export const placeOrderError = response => ({
  type: actionTypes.PLACE_ORDER_ERROR,
  message: response.message,
});

export const placeOrder = orderDetails => dispatch => attachAuthToken(token)
  .post(`${domain}/api/v1/orders`, orderDetails).then((response) => {
    dispatch(placeOrderSuccess(response.data.data));
    return response.data.data;
  })
  .catch(error => error.response.data);
