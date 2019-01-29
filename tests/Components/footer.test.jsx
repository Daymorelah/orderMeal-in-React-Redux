import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../src/Components/footer';

describe('Unit test for the footer component', () => {
  it('should render the footer component to the dom', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div').is('#footer')).toEqual(true);
    expect(wrapper.find('p').text())
      .toEqual('Designed by Hussain A.I © 2018');
  });
});
