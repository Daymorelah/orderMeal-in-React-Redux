import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../src/Components/card';

describe('Unit test for the card component', () => {
  it('should render a card ', () => {
    const propsObj = {
      meal: 'Rice',
      mealType: 'Main dish',
      prize: 400,
      isMealCanceled: true,
      onClick: () => {}
    };
    const wrapper = shallow(<Card {...propsObj} />);
    expect(wrapper.find('div').length).toEqual(4);
    expect(wrapper.find('span').length).toEqual(2);
    expect(wrapper.find('Button').length).toEqual(1);
    expect(wrapper.find('.meal-property').at(0).text())
      .toEqual(`${propsObj.mealType}: `);
    expect(wrapper.find('.meal-property').at(1).text())
      .toEqual('Prize: ');
    expect(wrapper.find('.card-body').find('p').at(0).text())
      .toEqual(`${propsObj.mealType}: ${propsObj.meal}`);
  });
});
