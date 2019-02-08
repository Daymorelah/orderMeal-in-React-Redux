import React from 'react';
import { shallow } from 'enzyme';
import CartForm from '../../../src/Components/createOrder/cartForm';

describe('Unit test for the cartForm component', () => {
  it('should use localStorage to populate input fields when has '
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
});
