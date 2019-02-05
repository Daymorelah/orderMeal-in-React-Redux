import ConfigureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';
import * as actionTypes from '../../src/actions/actionTypes';
import * as menuAction from '../../src/actions/menuActions';

const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);

describe('Unit tests for the menu actions', () => {
  const menuList = {
    menu: [{
      id: 1,
      meal_type: 'Appetizer',
      meal: 'Small chops',
      prize: 400,
      userid: 2,
    }],
  };
  describe('Unit tests for the action creators', () => {
    it('should return the list of menu items on a successful request', () => {
      const expectedAction = {
        type: actionTypes.LOAD_MENU_SUCCESS,
        menu: menuList.menu,
      };
      expect(menuAction.loadMenuSuccess(menuList))
        .toEqual(expectedAction);
    });
    it('should return the menu type not available when '
      + 'a filter search for a meal type returns null', () => {
      const menuType = 'some menu type';
      const expectedAction = {
        type: actionTypes.NO_MENU_TYPE_YET,
        payload: menuType
      };
      expect(menuAction.noMenuTypeYet(menuType))
        .toEqual(expectedAction);
    });
  });
  describe('unit tests for the async action creators', () => {
    afterEach(() => {
      if (axios.get.restore) axios.get.restore();
    });
    const response = {
      data: {
        data: menuList,
      }
    };
    it('should dispatch the appropriate action when '
    + 'a get request to list menu is successful', () => {
      sinon.stub(axios, 'get').resolves(response);
      const store = mockStore({});
      const expectedAction = [
        { type: actionTypes.LOAD_MENU_SUCCESS, menu: menuList.menu, }
      ];
      return store.dispatch(menuAction.loadMenu('')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch the appropriate action when '
    + 'a menu type requested for is not available', () => {
      response.data.data.menu = null;
      const menuType = 'some menu type';
      sinon.stub(axios, 'get').resolves(response);
      const store = mockStore({});
      const expectedAction = [
        { type: actionTypes.NO_MENU_TYPE_YET, payload: menuType, }
      ];
      return store.dispatch(menuAction.loadMenu(menuType)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should return an error when an error occurs '
    + 'when a request is sent', () => {
      sinon.stub(axios, 'get').rejects({ message: 'some error' });
      const store = mockStore({});
      return store.dispatch(menuAction.loadMenu('')).then(() => {
        expect(store.getActions()).toEqual([]);
      });
    });
  });
});
