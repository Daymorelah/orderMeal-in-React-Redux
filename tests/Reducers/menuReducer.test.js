import * as actionTypes from '../../src/actions/actionTypes';
import menuReducer from '../../src/reducers/menuReducer';

describe('Unit test for the signup reducer ', () => {
  it('should return the initial state of the store ', () => {
    const initialState = { menu: [], noMenu: '' };
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });
  it('should update the store when a get menu request is successful ', () => {
    const userCreated = {
      menu: [{ menuItem: 'some message' }]
    };
    const menuActionDispatched = {
      type: actionTypes.LOAD_MENU_SUCCESS,
      menu: userCreated.menu,
    };
    expect(menuReducer({}, menuActionDispatched))
      .toEqual({
        menu: [...userCreated.menu],
        noMenu: ''
      });
  });
  it('should update the store when there is a client error during signup',
    () => {
      const signupActionDispatched = {
        type: actionTypes.NO_MENU_TYPE_YET,
        payload: 'some menu type'
      };
      expect(menuReducer({}, signupActionDispatched))
        .toEqual({
          noMenu: 'some menu type',
          menu: []
        });
    });
});
