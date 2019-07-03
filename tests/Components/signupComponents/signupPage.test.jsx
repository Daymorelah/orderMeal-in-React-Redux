import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import sinon from 'sinon';
import * as toast from '../../../src/utilities/toastrUtil';
import * as actionTypes from '../../../src/actions/actionTypes';
import { SignupPage, mapStateToProps, mapDispatchToProps } from
  '../../../src/Components/signup/signupPage';

describe('Unit test for the signup page', () => {
  const propsObj = {
    registeredUser: {
      message: 'some message',
      status: 'some status',
      isAuthenticated: false,
    },
    signupUser: () => {},
    history: {
      path: ''
    }
  };
  it('should call componentDidMount when the signup page '
    + 'component is mounted', () => {
    jest.spyOn(SignupPage.prototype, 'componentDidMount')
      .mockReturnValueOnce(true);
    shallow(<SignupPage {...propsObj} />);
    expect(SignupPage.prototype.componentDidMount.mock.calls.length).toEqual(1);
  });
  it('should map correct state to prop', () => {
    const appState = { currentUser: {} };
    const expectedComponentState = { registeredUser: appState.currentUser };
    const componentState = mapStateToProps(appState);
    expect(componentState).toEqual(expectedComponentState);
  });
  it('should map the correct dispatch to props', () => {
    const mockDispatch = jest.fn();
    mapDispatchToProps(mockDispatch).signupUser({});
    expect(mockDispatch.mock.calls.length).toBe(1);
  });
  it('should render a navigation bar, footer and a form ', () => {
    const wrapper = shallow(<SignupPage {...propsObj} />);
    expect(wrapper.find('NavigationBar').length).toEqual(1);
    expect(wrapper.find('SignupForm').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
  });
  it('should update the internal state when an input field changes', () => {
    const wrapper = mount(<Router><SignupPage {...propsObj} /></Router>);
    const usernameFormInput = wrapper.find('FormInput#username');
    expect(usernameFormInput.prop('type')).toEqual('text');
    usernameFormInput
      .simulate('change', { target: { value: 'myName', id: 'username' } });
    expect(wrapper.find(SignupPage).state('username')).toEqual('myName');
  });
  it('should send a post request when the submit button is clicked', () => {
    propsObj.signupUser = jest.fn().mockReturnValueOnce({
      type: actionTypes.AUTH_USER_SUCCESS
    });
    // jest.spyOn(toast, 'default').mockReturnValueOnce(true);
    const wrapper = mount(<Router><SignupPage {...propsObj} /></Router>);
    const signupButton = wrapper.find('button#signup-button');
    expect(signupButton.prop('type')).toEqual('submit');
    signupButton.simulate('click');
    expect(wrapper.find(SignupPage).state('isTyping')).toEqual(false);
    expect(wrapper.find(SignupPage).state('buttonStatus'))
      .toEqual('Signing in...');
  });
  it('should send a post request when the submit button is clicked', () => {
    propsObj.signupUser = jest.fn().mockReturnValueOnce({
      type: actionTypes.CLIENT_ERROR,
      message: 'some error message',
    });
    jest.spyOn(toast, 'default').mockReturnValueOnce(true);
    const wrapper = mount(<Router><SignupPage {...propsObj} /></Router>);
    const signupButton = wrapper.find('button#signup-button');
    expect(signupButton.prop('type')).toEqual('submit');
    signupButton.simulate('click');
    wrapper.update(); wrapper.update();
    expect(wrapper.find(SignupPage).state('isTyping')).toEqual(false);
  });
  it('should redirect to the home page when a user is authenticated', () => {
    propsObj.history.push = () => {};
    const mockPushMethod = sinon.spy(propsObj.history, 'push');
    propsObj.registeredUser.isAuthenticated = true;
    mount(<Router><SignupPage {...propsObj} /></Router>);
    expect(mockPushMethod.calledOnce).toEqual(true);
  });
});
