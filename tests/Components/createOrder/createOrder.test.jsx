import React from 'react';
import { shallow } from 'enzyme';
import CreateOrder from '../../../src/Components/createOrder/createOrder';

describe('Unit test for the CreateOrder component', () => {
  it('should render the CreateOrder component', () => {
    const propsObj = {
      showOrders: true,
      menuItems: [{}],
      cancelOrder: () => {},
      createOrder: () => {},
      removeMenuItem: () => {},
      incrementMenuItem: () => {},
      decrementMenuItem: () => {},
      getUsersAddress: () => {},
      getUsersPhoneNumber: () => {},
      address: 'my address',
      phoneNumber: 'my phone number',
    };
    const wrapper = shallow(<CreateOrder {...propsObj} />);
    expect(wrapper.find('Button').length).toEqual(2);
    expect(wrapper.find('CartForm').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(8);
    expect(wrapper.find('section').length).toEqual(1);
  });
  it('should render the createOrder component', () => {
    const propsObj = {
      menuItems: [],
      address: 'my address',
      phoneNumber: 'my phone',
    };
    const wrapper = shallow(<CreateOrder {...propsObj} />);
    expect(wrapper.find('Button').length).toEqual(2);
    expect(wrapper.find('p').at(1).text()).toBe('You have not selected any '
    + 'meals to order yet. Click the "Back To Menu" button to '
    + 'go back and select a meal.');
    expect(wrapper.find('CartForm').length).toEqual(1);
  });
});
