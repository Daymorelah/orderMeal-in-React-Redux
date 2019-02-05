import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/Components/button';

describe('Unit tests for the button component', () => {
  it('should render a button ', () => {
    const mockFunction = jest.fn();
    const propsObj = {
      value: 'button value',
      id: 'id attribute',
      className: 'class attribute',
      onClick: mockFunction
    };
    const wrapper = shallow(<Button {...propsObj} />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('button value');
    expect(wrapper.find('[id="id attribute"]'));
    expect(wrapper.find('[class="class attribute"]'));
    wrapper.find('button').simulate('click');
    expect(propsObj.onClick.mock.calls.length).toBe(1);
  });
});
