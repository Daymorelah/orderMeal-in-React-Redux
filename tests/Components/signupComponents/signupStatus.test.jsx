import React from 'react';
import { shallow } from 'enzyme';
import SignupStatus from '../../../src/Components/signup/signupStatus';

describe('Unit test for the Signup status component', () => {
  it('should render a success message with success style applied', () => {
    const propsObj = {
      statusMessage: 'some success message',
      status: true,
      isTyping: false
    };
    const wrapper = shallow(<SignupStatus {...propsObj} />);
    expect(wrapper.find('section').is('#success-error-response')).toEqual(true);
    expect(wrapper.find('div').is('#response-container')).toEqual(true);
    expect(wrapper.find('[classToApply="success-response"]'));
    expect(wrapper.find('p').text()).toEqual(propsObj.statusMessage);
  });
  it('should render an error message with error style applied', () => {
    const propsObj = {
      statusMessage: 'some error message',
      status: false,
      isTyping: false
    };
    const wrapper = shallow(<SignupStatus {...propsObj} />);
    expect(wrapper.find('section').is('#success-error-response')).toEqual(true);
    expect(wrapper.find('div').is('#response-container')).toEqual(true);
    expect(wrapper.find('[classToApply="error-response"]'));
    expect(wrapper.find('p').text()).toEqual(propsObj.statusMessage);
  });
  it('should not show any message when user is typing', () => {
    const propsObj = {
      statusMessage: 'some error message',
      status: false,
      isTyping: true
    };
    const wrapper = shallow(<SignupStatus {...propsObj} />);
    expect(wrapper.find('section').is('#success-error-response')).toEqual(true);
    expect(wrapper.find('div').is('#response-container')).toEqual(true);
    expect(wrapper.find('[classToApply=""]'));
    expect(wrapper.find('p').text()).toEqual(propsObj.statusMessage);
  });
});
