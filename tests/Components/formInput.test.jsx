import React from 'react';
import { shallow } from 'enzyme';
import FormInput from '../../src/Components/formInput';

describe('Unit test for the Form input component', () => {
  it('should render a form input component', () => {
    const propsObj = {
      onChange: () => {},
      placeHolder: 'my placeholder',
      id: 'some id attribute',
      type: 'input type',
      value: 'input value'
    };
    const wrapper = shallow(<FormInput {...propsObj} />);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('[type="input type"]'));
    expect(wrapper.find('[id="some id attribute"]'));
    expect(wrapper.find('[value="input value"]'));
    expect(wrapper.find('[placeHolder="my placeholder"]'));
  });
});
