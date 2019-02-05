import React from 'react';
import { shallow } from 'enzyme';
import MenuHeader from '../../../src/Components/listMenu/menuHeading';

describe('Unit test for the MenuHeader component', () => {
  it('should render a div', () => {
    const propsObj = { menuItems: 3 };
    const wrapper = shallow(<MenuHeader {...propsObj} />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(2);
    expect(wrapper.find('h3').at(0).text())
      .toEqual(`meals available | ${propsObj.menuItems}`);
    expect(wrapper.find('h3').at(1).text()).toEqual('Place order');
  });
});
