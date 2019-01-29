import React from 'react';
import { shallow } from 'enzyme';
import SignupButton from '../../../src/Components/signup/signupButton';

describe('Unit test for the signup button component', () => {
  it('should render a signup button', () => {
    const propsObj = {
      buttonStatus: 'Signup',
      onClick: () => {}
    };
    const wrapper = shallow(<SignupButton {...propsObj} />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Signup');
    expect(wrapper.find('[id="signup-button"]'));
    expect(wrapper.find('[type="submit"]'));
  });
  it('should call the onclick method when the button is clicked', () => {
    const mockOnclick = jest.fn();
    const propsObj = {
      buttonStatus: 'button status',
      onClick: mockOnclick,
    };
    const wrapper = shallow(<SignupButton {...propsObj} />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('button status');
    wrapper.find('button').simulate('click');
    expect(mockOnclick.mock.calls.length).toBe(1);
    expect(mockOnclick.mock.calls[0][0]).toBe(undefined);
  });
});
