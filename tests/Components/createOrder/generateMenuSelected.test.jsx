import React from 'react';
import { shallow } from 'enzyme';
import GenerateMenuSelected from
  '../../../src/Components/createOrder/generateMenuSelected';

describe('Unit test for GenerateMenuSelected component', () => {
  it('should render the GenerateMenuSelected component', () => {
    const propsObj = {
      menuItems: [{
        meal: 'my meal',
        meal_type: 'my meal type',
        prize: 200,
        id: 1,
        quantity: 3
      }],
      incrementMenuItem: () => {},
      decrementMenuItem: () => {},
      removeMenuItem: () => {},
    };
    const wrapper = shallow(<GenerateMenuSelected {...propsObj} />);
    expect(wrapper.find('span').length).toEqual(4);
    expect(wrapper.find('span').at(1).text()).toEqual('3');
    expect(wrapper.find('p').last().text()).toEqual('Total: ₦600');
  });
  it('should call incrementMenu function when the plus'
    + ' icon is clicked', () => {
    const propsObj = {
      menuItems: [{
        meal: 'my meal',
        meal_type: 'my meal type',
        prize: 200,
        id: 1,
        quantity: 3
      }],
      incrementMenuItem: jest.fn(),
      decrementMenuItem: () => {},
      removeMenuItem: () => {},
    };
    const wrapper = shallow(<GenerateMenuSelected {...propsObj} />);
    wrapper.find('span').first().simulate('click');
    wrapper.find('span').first().simulate('keypress');
    expect(propsObj.incrementMenuItem.mock.calls.length).toBe(2);
    expect(wrapper.find('span').at(1).text()).toEqual('3');
  });
  it('should call decrementMenu function when the minus'
    + ' icon is clicked', () => {
    const propsObj = {
      menuItems: [{
        meal: 'my meal',
        meal_type: 'my meal type',
        prize: 200,
        id: 1,
        quantity: 3
      }],
      incrementMenuItem: () => {},
      decrementMenuItem: jest.fn(),
      removeMenuItem: () => {},
    };
    const wrapper = shallow(<GenerateMenuSelected {...propsObj} />);
    wrapper.find('span').at(2).simulate('click');
    wrapper.find('span').at(2).simulate('keypress');
    expect(propsObj.decrementMenuItem.mock.calls.length).toBe(2);
    expect(wrapper.find('span').at(1).text()).toEqual('3');
  });
  it('should call removeMenuItem function when the times '
    + 'icon is clicked', () => {
    const propsObj = {
      menuItems: [{
        meal: 'my meal',
        meal_type: 'my meal type',
        prize: 200,
        id: 1,
        quantity: 3
      }],
      incrementMenuItem: () => {},
      decrementMenuItem: () => {},
      removeMenuItem: jest.fn(),
    };
    const wrapper = shallow(<GenerateMenuSelected {...propsObj} />);
    wrapper.find('span').last().simulate('click');
    wrapper.find('span').last().simulate('click');
    wrapper.find('span').last(2).simulate('keypress');
    expect(propsObj.removeMenuItem.mock.calls.length).toBe(3);
  });
});
