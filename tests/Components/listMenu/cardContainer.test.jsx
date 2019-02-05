import React from 'react';
import { shallow } from 'enzyme';
import CardContainer from '../../../src/Components/listMenu/cardContainer';

describe('Unit tests for the CardContainer Component', () => {
  it('should render cards based on the number of menu items passed', () => {
    const propsObj = {
      menu: [{
        id: 1,
        meal: 'small chops',
        meal_type: 'appetizer',
        prize: 300
      }, {
        id: 2,
        meal: 'fruit shake',
        meal_type: 'appetizer',
        prize: 300
      }],
      onClick: () => {},
      menuTypeUnavailable: ''
    };
    const wrapper = shallow(<CardContainer {...propsObj} />);
    expect(wrapper.find('Card').length).toEqual(2);
    expect(wrapper.find('#no-menu').length).toEqual(0);
    expect(wrapper.is('#meal-card-container')).toEqual(true);
  });
  it('should render no cards when the menu queried '
    + 'for is not available', () => {
    const propsObj = {
      menu: [{}],
      onClick: () => {},
      menuTypeUnavailable: 'Desert'
    };
    const wrapper = shallow(<CardContainer {...propsObj} />);
    expect(wrapper.find('#no-menu').length).toBe(1);
    expect(wrapper.find('Card').length).toBe(0);
    expect(wrapper.find('h3').text())
      .toEqual(`There are no ${propsObj.menuTypeUnavailable} available yet.`);
  });
});