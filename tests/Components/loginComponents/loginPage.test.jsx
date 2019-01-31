import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import sinon from 'sinon';
import * as authActions from '../../../src/actions/authActions';
import { LoginPage, mapStateToProps, mapDispatchToProps } from
  '../../../src/Components/login/loginPage';

describe('Unit test for the login page', () => {
  const propsObj = {
    registeredUser: {
      message: 'some message',
      status: 'some status',
    },
    signupUser: () => {},
    history: {
      path: ''
    }
  };
  it('should call componentDidMount when the signup page'
    + 'component is mounted', () => {
    const spiedMethod = sinon.spy(LoginPage.prototype, 'componentDidMount');
    shallow(<LoginPage {...propsObj} />);
    expect(spiedMethod.calledOnce).toEqual(true);
  });
  it('should map correct state to prop', () => {
    const appState = { currentUser: {} };
    const expectedComponentState = { registeredUser: appState.currentUser };
    const componentState = mapStateToProps(appState);
    expect(componentState).toEqual(expectedComponentState);
  });
  it('should map the correct dispatch to props', () => {
    const mockDispatch = jest.fn();
    mapDispatchToProps(mockDispatch).loginUser({});
    expect(mockDispatch.mock.calls.length).toBe(1);
  });
  it('should render a navigation bar, footer and a form ', () => {
    const wrapper = shallow(<LoginPage {...propsObj} />);
    expect(wrapper.find('NavigationBar').length).toEqual(1);
    expect(wrapper.find('LoginForm').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
  });
  it('should update the internal state when an input field changes', () => {
    const wrapper = mount(<Router><LoginPage {...propsObj} /></Router>);
    const usernameFormInput = wrapper.find('FormInput#username');
    expect(usernameFormInput.prop('type')).toEqual('text');
    usernameFormInput
      .simulate('change', { target: { value: 'myName', id: 'username' } });
    expect(wrapper.find(LoginPage).state('username')).toEqual('myName');
  });
  it('should send a post request when the submit button is clicked', () => {
    propsObj.loginUser = sinon
      .stub(authActions, 'authUser').resolves(undefined);
    propsObj.history.push = () => {};
    const mockPushMethod = sinon.spy(propsObj.history, 'push');
    const wrapper = mount(<Router><LoginPage {...propsObj} /></Router>);
    const loginButton = wrapper.find('button#login-button');
    expect(loginButton.prop('type')).toEqual('submit');
    loginButton.simulate('click');
    expect(wrapper.find(LoginPage).state('isTyping')).toEqual(false);
    expect(wrapper.find(LoginPage).state('buttonStatus'))
      .toEqual('Logging in...');
    expect(mockPushMethod.called).toEqual(false);
    propsObj.loginUser.restore();
  });
  it('should redirect to the home page when a user is authenticated', () => {
    propsObj.history.push = () => {};
    const mockPushMethod = sinon.spy(propsObj.history, 'push');
    propsObj.registeredUser.isAuthenticated = true;
    mount(<Router><LoginPage {...propsObj} /></Router>);
    expect(mockPushMethod.calledOnce).toEqual(true);
  });
});
