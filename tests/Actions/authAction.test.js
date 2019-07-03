import ConfigureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';
import * as actionTypes from '../../src/actions/actionTypes';
import * as authAction from '../../src/actions/authActions';

const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);

describe('Unit tests for the signup actions', () => {
  const userCreated = {
    message: 'User qwertyuyt created successfully',
    id: 66,
    username: 'parrot',
    email: 'some.email@mail.com',
    token: 'eyJhbGciXVCJ9.eyJ1c2VyS.mFtZSI6InF3mVtY'
  };
  describe('Unit tests for the action creators', () => {
    it('should return the user created on successful signup', () => {
      const expectedAction = {
        type: actionTypes.AUTH_USER_SUCCESS,
        userCreated,
      };
      expect(authAction.signupUserSuccess(userCreated))
        .toEqual(expectedAction);
    });
    it('should dispatch appropriate action when '
      + 'there is no internet connection', () => {
      const expectedAction = {
        type: actionTypes.NO_INTERNET,
        message: 'Could not connect to the internet. '
        + 'Please check your connection.',
      };
      expect(authAction.noInternet()).toEqual(expectedAction);
    });
    it('should dispatch appropriate action when '
      + 'there is a server error', () => {
      const expectedAction = {
        type: actionTypes.SERVER_ERROR,
        message: 'Internal server error. Please try again',
      };
      expect(authAction.serverError()).toEqual(expectedAction);
    });
    it('should dispatch appropriate action when '
      + 'there is a client error', () => {
      const expectedAction = {
        type: actionTypes.CLIENT_ERROR,
        message: 'some message'
      };
      expect(authAction.clientError({ message: 'some message' }))
        .toEqual(expectedAction);
    });
    it('should dispatch appropriate action when '
      + 'there is a general error', () => {
      const expectedAction = {
        type: actionTypes.GENERAL_ERROR,
        message: 'Something awful happened. We will fix this soon.'
      };
      expect(authAction.generalError()).toEqual(expectedAction);
    });
  });
  describe('Unit tests for the async action creators', () => {
    afterEach(() => {
      if (axios.post.restore) axios.post.restore();
    });
    const store = mockStore({ currentUser: {} });
    const userDetails = {
      username: 'my username',
      password: 'my password',
      email: 'wemail@wemail.com'
    };
    const response = {
      status: 201,
      data: {
        data: userCreated,
      }
    };
    it('should dispatch the appropriate action when '
      + 'a post request to signup a user is successful', () => {
      sinon.stub(axios, 'post').resolves(response);
      const expectedAction = [
        { type: actionTypes.AUTH_USER_SUCCESS, userCreated, }
      ];
      return store.dispatch(authAction.authUser(userDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch the appropriate action when '
      + 'a post request to signup a user yields a client error', () => {
      const clientError = {
        response: {
          status: 409,
          data: {
            data: {
              message: 'some message',
            }
          },
        },
      };
      sinon.stub(axios, 'post').rejects(clientError);
      const expectedAction = [
        { type: actionTypes.CLIENT_ERROR, message: 'some message' }
      ];
      return store.dispatch(authAction.authUser(userDetails)).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch the appropriate action when '
      + 'a post request to signup a user yields a server error', () => {
      const serverError = {
        response: {
          status: 500,
          data: {
            data: {
              message: 'Internal server error',
            }
          },
        },
      };
      sinon.stub(axios, 'post').rejects(serverError);
      const expectedAction = [
        { type: actionTypes.SERVER_ERROR, message: 'Internal server error' }
      ];
      return store.dispatch(authAction.authUser(userDetails)).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch the appropriate action when there is no internet '
      + 'during sending post request to signup a user', () => {
      const serverError = {
        message: 'Network Error',
      };
      sinon.stub(axios, 'post').rejects(serverError);
      const expectedAction = [
        {
          type: actionTypes.NO_INTERNET,
          message: 'Could not connect to the internet. '
          + 'Please check your connection.'
        }
      ];
      return store.dispatch(authAction.authUser(userDetails)).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    it('should dispatch the appropriate action when '
      + 'a post request to signup a user yields a general error', () => {
      sinon.stub(axios, 'post').rejects();
      const expectedAction = [
        {
          type: actionTypes.GENERAL_ERROR,
          message: 'Something awful happened. We will fix this soon.'
        }
      ];
      return store.dispatch(authAction.authUser(userDetails)).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
