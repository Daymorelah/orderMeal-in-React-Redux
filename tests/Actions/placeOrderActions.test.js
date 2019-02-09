import sinon from 'sinon';
import axios from 'axios';
import ConfigureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../src/actions/actionTypes';
import * as placeOrderAction from '../../src/actions/placeOrderAction';

const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);

describe('Unit tests for the placeOrder actions', () => {
  afterEach(() => {
    if (axios.create.restore) axios.create.restore();
  });
  const orderCreated = {
    order: [{
      id: 1,
      meal_type: 'Appetizer',
      meal: 'Small chops',
      prize: 400,
      userid: 2,
    }],
  };
  describe('Unit tests for the action creators', () => {
    it('should return the order created on a successful request', () => {
      const expectedAction = {
        type: actionTypes.PLACE_ORDER_SUCCESS,
        order: orderCreated.order,
      };
      expect(placeOrderAction.placeOrderSuccess(orderCreated))
        .toEqual(expectedAction);
    });
  });
  describe('Unit tests for the async action creators', () => {
    it('should call apropriate actionswhen we place an order', () => {
      const response = { data: { data: orderCreated } };
      sinon.stub(axios, 'create').returns({
        defaults: { headers: { common: {} } },
        post: () => Promise.resolve(response)
      });
      const store = mockStore({});
      const expectedAction = [
        { type: actionTypes.PLACE_ORDER_SUCCESS, order: orderCreated.order, }
      ];
      return store.dispatch(placeOrderAction.placeOrder({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch no action when an error occurs when an '
      + 'order request fails', () => {
      const response = { response: { data: 'my error' } };
      sinon.stub(axios, 'create').returns({
        defaults: { headers: { common: {} } },
        post: () => Promise.reject(response)
      });
      const store = mockStore({});
      return store.dispatch(placeOrderAction.placeOrder({})).then(() => {
        expect(store.getActions()).toEqual([]);
      });
    });
  });
});
