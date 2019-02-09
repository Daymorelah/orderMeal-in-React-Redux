import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from '../../src/Components/navigationBar';

describe('Unit test for the Home page component', () => {
  it('should render the home component to the dom', () => {
    const propsObj = {
      isAuthenticated: true,
      showOnAuth: 'show auth',
      showOnUnauth: 'show unauth',
      showRightNavBar: true
    };
    const wrapper = shallow(<NavigationBar {...propsObj} />);
    expect(wrapper.find('div').length).toEqual(3);
  });
});
