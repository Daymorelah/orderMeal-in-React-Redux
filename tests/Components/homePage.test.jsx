import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../src/Components/home';

describe('Unit test for the Home page component', () => {
  it('should render the home component to the dom', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('h1').text())
      .toEqual('This is the Home page for the app');
  });
});
