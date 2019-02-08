import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuPage, mapStateToProps, mapDispatchToProps } from
  '../../../src/Components/listMenu/menuPage';

describe('Unit test for the MenuPage component', () => {
  const propsObj = {
    menu: [{
      id: 1,
      meal: 'small chops',
      meal_type: 'appetizer',
      prize: 300
    }],
    loadMenu: jest.fn().mockResolvedValue(),
    menuTypeUnavailable: ''
  };
  it('should call componentDidMount when the signup page'
    + 'component is mounted', () => {
    const spiedMethod = sinon.spy(MenuPage.prototype, 'componentDidMount');
    shallow(<MenuPage {...propsObj} />);
    expect(spiedMethod.calledOnce).toEqual(true);
    expect(propsObj.loadMenu.mock.calls.length).toBe(1);
  });
  /* eslint-disable prefer-promise-reject-errors */
  it('should show an error message when the request '
   + 'to get menu items fails', () => {
    propsObj.loadMenu = jest.fn().mockImplementation(() => Promise
      .reject({ message: 'my error message' }));
    shallow(<MenuPage {...propsObj} />);
    expect(propsObj.loadMenu.mock.calls.length).toBe(1);
  });
  it('should map correct state to prop', () => {
    const appState = {
      menuReducer: {
        menu: [{}],
        moMenu: ''
      }
    };
    const expectedComponentState = {
      menu: appState.menuReducer.menu,
      menuTypeUnavailable: appState.menuReducer.noMenu
    };
    const componentState = mapStateToProps(appState);
    expect(componentState).toEqual(expectedComponentState);
  });
  it('should map the correct dispatch to props', () => {
    const mockDispatch = jest.fn();
    mapDispatchToProps(mockDispatch).loadMenu();
    expect(mockDispatch.mock.calls.length).toBe(1);
  });
  it('should render the menu page', () => {
    const wrapper = shallow(<MenuPage {...propsObj} />);
    expect(wrapper.find('NavigationBar').length).toEqual(1);
    expect(wrapper.find('SearchMenu').length).toEqual(1);
    expect(wrapper.find('MenuHeading').length).toEqual(1);
    expect(wrapper.find('paginate').length).toEqual(1);
    expect(wrapper.find('CreateOrder').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    expect(wrapper.find('Loading').length).toEqual(1);
    expect(wrapper.find('CardContainer').length).toEqual(0);
  });
  it('should update the internal state when a menu '
    + 'type is selected', async () => {
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    const selectTag = wrapper.find('#filter');
    await selectTag
      .simulate('change', { target: { value: 'appetizer' } });
    expect(wrapper.find(MenuPage).state('filterBy')).toEqual('appetizer');
  });
  it('should make a request based on the user\'s selection', async () => {
    propsObj.loadMenu = jest.fn().mockResolvedValue();
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    expect(wrapper.find(MenuPage).state('isRequestSent')).toEqual(true);
    const searchIcon = wrapper.find('#search-meal-icon');
    expect(searchIcon.prop('role')).toEqual('button');
    await searchIcon.simulate('click');
    // expect(wrapper.find(MenuPage).state('isRequestSent')).toEqual(false);
  });
  it('should show an error message when the request '
   + 'to get menu items fails', async () => {
    propsObj.loadMenu = jest.fn()
      .mockRejectedValue({ message: 'my error message' });
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    const searchIcon = wrapper.find('#search-meal-icon');
    expect(wrapper.find(MenuPage).state('isRequestSent')).toEqual(true);
    await searchIcon.simulate('click');
    expect(searchIcon.prop('role')).toEqual('button');
    expect(wrapper.find(MenuPage).state('isRequestSent')).toEqual(true);
  });
  it('should call appropriate methods when the user '
    + 'types his address and phone number', () => {
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    wrapper.find('input#address')
      .simulate('change', { target: { value: 'some address' } });
    expect(wrapper.find('MenuPage').state('address')).toEqual('some address');
    wrapper.find('input#phone-number')
      .simulate('change', { target: { value: 'some phone number' } });
    expect(wrapper.find('MenuPage').state('phoneNumber'))
      .toEqual('some phone number');
  });
  it('should call appropriate methods when the user clicks '
    + 'on the plus , times and minus icon', () => {
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    const menuItems = [{
      meal: 'my meal',
      meal_type: 'my meal type',
      prize: 200,
      id: 1,
      quantity: 3
    }];
    wrapper.find('MenuPage').setState({ menuItemSelected: menuItems });
    wrapper.find('.add').simulate('click', { id: 1 });
    wrapper.find('.reduce').simulate('click', { id: 1 });
    wrapper.find('.remove-meal').simulate('click', { id: 3 });
    expect(wrapper.find('MenuPage').state('menuItemSelected')).toEqual([]);
  });
  it('should call appropriate methods when an item card is clicked', () => {
    const menuItems = [{
      meal: 'my meal',
      meal_type: 'my meal type',
      prize: 200,
      id: 1,
      quantity: 3
    }];
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    wrapper.find('MenuPage').setState({ isRequestSent: false });
    wrapper.find('Button#card-button')
      .simulate('click', { target: { style: { display: 'none' } } }, menuItems);
    expect(wrapper.find('MenuPage').state('isMealCanceled')).toEqual(false);
    expect(wrapper.find('MenuPage')
      .state('menuItemSelected').length).toEqual(1);
  });
  it('should not duplicate a menu card in localstorage', () => {
    const menuItems = [{
      meal: 'my meal',
      meal_type: 'my meal type',
      prize: 200,
      id: 1,
      quantity: 3
    }];
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    wrapper.find('MenuPage')
      .setState({ menuItemSelected: menuItems, isRequestSent: false });
    wrapper.find('Button#card-button')
      .simulate('click', { target: { style: { display: 'none' } } }, menuItems);
    expect(wrapper.find('MenuPage').state('isMealCanceled')).toEqual(false);
    expect(wrapper.find('MenuPage')
      .state('menuItemSelected').length).toEqual(1);
  });
  it('should return card display to block when an order is cancelled', () => {
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    wrapper.find('Button#cancel-order').simulate('click');
    expect(wrapper.find('MenuPage').state('isMealCanceled')).toEqual(true);
    expect(wrapper.find('MenuPage').state('showOrders')).toEqual(false);
  });
  it('should show orders in cart when the placer '
    + 'order button is clicked', () => {
    const wrapper = mount(<Router><MenuPage {...propsObj} /></Router>);
    wrapper.find('#ordered-meal-text #add-order').simulate('click');
    expect(wrapper.find('MenuPage').state('showOrders')).toEqual(true);
  });
});
