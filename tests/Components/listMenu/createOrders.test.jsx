import React from 'react';
import { shallow } from 'enzyme';
import CreateOrders from '../../../src/Components/listMenu/createOrder';

describe('Unit tests for the CardOrder Component', () => {
  it('should render the createOrder component', () => {
    const wrapper = shallow(<CreateOrders />);
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('p').at(1).text()).toBe('You have not selected any '
    + 'meals to order yet. Click the cancel button to '
    + 'go back and select a meal.');
    expect(wrapper.find('input').length).toEqual(2);
  });
});
