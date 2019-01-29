import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from '../../src/Components/navigationBar';

describe('Unit test for the Home page component', () => {
  it('should render the home component to the dom', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper.find('div').is('#logo')).toEqual(true);
    expect(wrapper.find('div').text()).toEqual('<Link />');
  });
});
