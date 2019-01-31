import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../src/Components/login/loginForm';

describe('Unit test for the login form component', () => {
  it('should render three form inputs, one submit button and'
  + 'one sign up status component', () => {
    const propsObj = {
      onClick: () => {},
      message: 'some message',
      status: true,
      onChange: () => {},
      isTyping: true,
      buttonStatus: 'some status',
      username: 'my Username',
      password: '',
      email: '',
    };
    const wrapper = shallow(<LoginForm {...propsObj} />);
    expect(wrapper.find('FormInput').length).toEqual(2);
    expect(wrapper.find('SignupStatus').length).toEqual(1);
    expect(wrapper.find('SignupButton').length).toEqual(1);
  });
});
