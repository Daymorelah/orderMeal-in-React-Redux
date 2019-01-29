import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../src/Components/about';

describe('Unit test for the about page', () => {
  it('should render an about page', () => {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper.find('h1').text())
      .toEqual('This is the about page for the app');
    expect(wrapper.is('div')).toEqual(true);
  });
});
