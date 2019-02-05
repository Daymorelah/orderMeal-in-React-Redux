import React from 'react';
import { shallow } from 'enzyme';
import SearchMenu from '../../../src/Components/listMenu/searchMenu';

describe('Unit tests for the SearchMenu Component', () => {
  it('should render the SearchMenu component', () => {
    const propsObj = {
      onClick: () => {},
      onChange: () => {}
    };
    const wrapper = shallow(<SearchMenu {...propsObj} />);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('option').length).toBe(6);
    expect(wrapper.find('input')
      .find('[placeholder="Search available meals"]'));
  });
});
