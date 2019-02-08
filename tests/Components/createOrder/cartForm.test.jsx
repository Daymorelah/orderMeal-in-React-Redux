import React from 'react';
import { shallow } from 'enzyme';
import CartForm from '../../../src/Components/createOrder/cartForm';

describe('Unit test for the cartForm component', () => {
  it('should use localStorage to populate input fields when user has '
    + 'already typed order-info previously', () => {
    const propsObj = {
      contactUserStyle: { cont: 'my cont' },
      getUsersAddress: () => {},
      getUsersPhoneNumber: () => {},
      address: 'my address',
      phoneNumber: 'my phone number',
      addressInLocalStorage: 'storage address',
      phoneNumberInLocalStorage: 'storage phone number',
    };
    const wrapper = shallow(<CartForm {...propsObj} />);
    expect(wrapper.find('input#address').length).toEqual(1);
    expect(wrapper.find('input#phone-number').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(2);
  });
  it('should use localStorage to populate input fields when address value'
    + 'in state is empty', () => {
    const propsObj = {
      contactUserStyle: { cont: 'my cont' },
      getUsersAddress: () => {},
      getUsersPhoneNumber: () => {},
      address: '',
      phoneNumber: '',
      addressInLocalStorage: 'storage address',
      phoneNumberInLocalStorage: 'storage phone number',
    };
    const wrapper = shallow(<CartForm {...propsObj} />);
    expect(wrapper.find('input#address').length).toEqual(1);
    expect(wrapper.find('input#phone-number').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(2);
  });
  it('should set input fileds to empty when there is no data in both'
    + 'state and local storage', () => {
    const propsObj = {
      contactUserStyle: { cont: 'my cont' },
      getUsersAddress: () => {},
      getUsersPhoneNumber: () => {},
      address: '',
      phoneNumber: '',
      addressInLocalStorage: '',
      phoneNumberInLocalStorage: '',
    };
    const wrapper = shallow(<CartForm {...propsObj} />);
    expect(wrapper.find('input#address').length).toEqual(1);
    expect(wrapper.find('input#phone-number').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(2);
  });
});
