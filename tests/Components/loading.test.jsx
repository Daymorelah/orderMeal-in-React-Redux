import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../src/Components/loading';

describe('Unit tests for the loading component', () => {
  it('should render two divs and one h3 tag', () => {
    const propsObj = {
      isRequestSent: true
    };
    const wrapper = shallow(<Loading {...propsObj} />);
    expect(wrapper.find('div').length).toEqual(2);
    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual('loading...');
    expect(wrapper.find('[style="block"]'));
  });
  it('should not display the loader when a response'
    + ' to a request is received', () => {
    const propsObj = {
      isRequestSent: false
    };
    const wrapper = shallow(<Loading {...propsObj} />);
    expect(wrapper.find('[style="none"]'));
  });
});
