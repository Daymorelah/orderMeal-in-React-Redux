import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utilities/toastrUtil';
import CardContainer from './cardContainer';
import MenuHeading from './menuHeading';
import Paginate from '../paginate';
import SearchMenu from './searchMenu';
import Header from '../navigationBar';
import Loading from '../loading';
import CreateOrder from '../createOrder/createOrder';
import Footer from '../footer';
import * as menuActions from '../../actions/menuActions';

export class MenuPage extends Component {
  state = {
    isRequestSent: true,
    filterBy: '',
    showOrders: false,
    menuItemSelected: [],
    isMealCanceled: false,
    address: '',
    phoneNumber: '',
  };

  componentDidMount() {
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    const itemsPreviouslySelected = JSON
      .parse(localStorage.getItem('menuItemSelected'));
    loadMenu(filterBy)
      .then(() => this.setState({ isRequestSent: false }))
      .catch(error => toastr('error', error.message, 4000));
    this.setState({ menuItemSelected: itemsPreviouslySelected || [] });
  }

  handleFilterBy = () => {
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    this.setState({ isRequestSent: true });
    loadMenu(filterBy)
      .then(() => this.setState({ isRequestSent: false }))
      .catch((error) => {
        this.setState({ isRequestSent: false });
        toastr('error', error.message, 4000);
      });
  }

  handleSelectOption = (event) => {
    this.setState({ filterBy: event.target.value });
  }

  handleMealCardOnclick = (event, menuItem) => {
    event.target.style.display = 'none';
    this.setState({ isMealCanceled: false });
    const { menuItemSelected } = this.state;
    if (!menuItemSelected.find(menu => menu.id === menuItem.id)) {
      menuItem.quantity = 1;
      this.setState({ menuItemSelected: [...menuItemSelected, menuItem] });
      menuItemSelected.push(menuItem);
      localStorage.setItem('menuItemSelected', JSON
        .stringify(menuItemSelected));
    }
  }

  showOrders = () => {
    this.setState({ showOrders: true });
  }

  handleCancelOrder = () => {
    this.setState((prevState) => {
      localStorage.setItem('address', prevState.address);
      localStorage.setItem('phoneNumber', prevState.phoneNumber);
      return { showOrders: false, isMealCanceled: true };
    });
  }

  handleRemoveMenuItem = (menuItemId) => {
    const { menuItemSelected } = this.state;
    const updatedMenuItems = menuItemSelected
      .filter(menu => menu.id !== menuItemId);
    this.setState({ menuItemSelected: [...updatedMenuItems] });
    localStorage.setItem('menuItemSelected', JSON
      .stringify(updatedMenuItems));
  }

  handleIncrementMenuItem = (menuItemId) => {
    const { menuItemSelected } = this.state;
    const menuToIncrement = menuItemSelected
      .filter(menu => menu.id === menuItemId);
    menuToIncrement[0].quantity += 1;
    this.setState({ menuItemSelected: [...menuItemSelected] });
    localStorage.setItem('menuItemSelected', JSON
      .stringify([...menuItemSelected]));
  }

  handleDecrementMenuItem = (menuItemId) => {
    const { menuItemSelected } = this.state;
    const menuToIncrement = menuItemSelected
      .filter(menu => menu.id === menuItemId);
    if (menuToIncrement[0].quantity > 1) {
      menuToIncrement[0].quantity -= 1;
      this.setState({ menuItemSelected: [...menuItemSelected] });
      localStorage.setItem('menuItemSelected', JSON
        .stringify([...menuItemSelected]));
    }
  }

  handleGetUsersAddress = (event) => {
    this.setState({ address: event.target.value });
  }

  handleGetUsersPhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  }

  handleCreateOrder = () => {}

  render() {
    const { menu, menuTypeUnavailable } = this.props;
    const {
      isRequestSent, showOrders, menuItemSelected, isMealCanceled,
      address, phoneNumber
    } = this.state;
    return (
      <div>
        <Header />
        <main id="menu-page-container">
          <SearchMenu
            onClick={this.handleFilterBy}
            onChange={this.handleSelectOption}
          />
          <section id="ordered-meals-container">
            <div className="container">
              <MenuHeading menuItems={menu.length} onClick={this.showOrders} />
              {
                isRequestSent ? <Loading isRequestSent={isRequestSent} />
                  : (
                    <CardContainer
                      menu={menu}
                      menuTypeUnavailable={menuTypeUnavailable}
                      onClick={this.handleMealCardOnclick}
                      isMealCanceled={isMealCanceled}
                    />
                  )
              }
            </div>
          </section>
          <Paginate />
          <CreateOrder
            showOrders={showOrders}
            menuItems={menuItemSelected}
            cancelOrder={this.handleCancelOrder}
            createOrder={this.handleCreateOrder}
            removeMenuItem={this.handleRemoveMenuItem}
            incrementMenuItem={this.handleIncrementMenuItem}
            decrementMenuItem={this.handleDecrementMenuItem}
            getUsersAddress={this.handleGetUsersAddress}
            getUsersPhoneNumber={this.handleGetUsersPhoneNumber}
            address={address}
            phoneNumber={phoneNumber}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  menu: state.menuReducer.menu,
  menuTypeUnavailable: state.menuReducer.noMenu,
});

export const mapDispatchToProps = dispatch => ({
  loadMenu: filterBy => dispatch(menuActions.loadMenu(filterBy))
});

MenuPage.propTypes = {
  loadMenu: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuTypeUnavailable: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
