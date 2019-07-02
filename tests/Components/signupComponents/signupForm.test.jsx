import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../../src/Components/signup/signupForm';

describe('Unit test for the signup form component', () => {
  it('should render three form inputs, one submit button and '
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
    const wrapper = shallow(<SignupForm {...propsObj} />);
    expect(wrapper.find('FormInput').length).toEqual(3);
    expect(wrapper.find('SignupButton').length).toEqual(1);
  });
});
