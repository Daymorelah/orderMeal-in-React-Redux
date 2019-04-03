import * as actionTypes from '../../src/actions/actionTypes';
import signupReducer from '../../src/reducers/signupReducer';

describe('Unit test for the signup reducer ', () => {
  it('should return the initial state of the store ', () => {
    const initialState = {
      userDetails: {}, message: '', isAuthenticated: false
    };
    expect(signupReducer(undefined, {})).toEqual(initialState);
  });
  it('should update the store when a signup is successful ', () => {
    const userCreated = {
      message: 'some message'
    };
    const signupActionDispatched = {
      type: actionTypes.AUTH_USER_SUCCESS,
      userCreated,
    };
    expect(signupReducer({}, signupActionDispatched))
      .toEqual({
        userDetails: userCreated,
        message: userCreated.message,
        isAuthenticated: true,
      });
  });
  it('should update the store when there is a client error during signup',
    () => {
      const signupActionDispatched = {
        type: actionTypes.CLIENT_ERROR,
        message: 'some client error'
      };
      expect(signupReducer({}, signupActionDispatched))
        .toEqual({
          message: 'some client error',
        });
    });
});
