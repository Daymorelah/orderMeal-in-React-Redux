import React from 'react';
import { shallow } from 'enzyme';
import Paginate from '../../src/Components/paginate';

describe('Unit test for the paginate container', () => {
  it('should render five span tags and two icon tags', () => {
    const wrapper = shallow(<Paginate />);
    expect(wrapper.find('span').length).toEqual(5);
    expect(wrapper.find('i').length).toEqual(2);
    expect(wrapper.find('.page').length).toEqual(5);
    expect(wrapper.find('a').length).toEqual(1);
    expect(wrapper.find('.fas').length).toEqual(2);
  });
});
