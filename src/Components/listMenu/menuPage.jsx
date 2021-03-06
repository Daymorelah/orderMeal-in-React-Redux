import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastrUtil from '../../utilities/toastrUtil';
import CardContainer from './cardContainer';
import MenuHeading from './menuHeading';
import Paginate from '../paginate';
import SearchMenu from './searchMenu';
import NavigationBar from '../navigationBar';
import Loading from '../loading';
import CreateOrder from '../createOrder/createOrder';
import getPayload from '../../utilities/decodeJwt';
import Footer from '../footer';
import * as menuActions from '../../actions/menuActions';
import * as placeOrderActions from '../../actions/placeOrderAction';

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
    const { loadMenu, location: { search, } } = this.props;
    const { filterBy } = this.state;
    const itemsPreviouslySelected = JSON
      .parse(localStorage.getItem('menuItemSelected'));
    const phoneNumber = localStorage.getItem('phoneNumber') || '';
    const address = localStorage.getItem('address') || '';
    this.showMessage(search);
    loadMenu({ filterBy, })
      .then(() => {
        this.setState({
          isRequestSent: false,
          menuItemSelected: itemsPreviouslySelected || [],
          address,
          phoneNumber
        });
      })
      .catch(error => toastrUtil('error', error.message, 400));
  }

  showMessage = (search) => {
    const params = new URLSearchParams(search);
    const status = params.has('stat') ? params.get('stat') : null;
    if (status !== null) {
      try {
        const payload = getPayload(status);
        if (payload.success) {
          toastrUtil('success', payload.message);
          localStorage.setItem(
            'userDetails', JSON.stringify(payload.userDetails)
          );
          localStorage.setItem('token', payload.token);
        }
      } catch (err) { return false; }
    }
  }

  handleFilterBy = () => {
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    this.setState({ isRequestSent: true });
    loadMenu(filterBy)
      .then(() => this.setState({ isRequestSent: false }))
      .catch((error) => {
        this.setState({ isRequestSent: false });
        toastrUtil('error', error.message, 4000);
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
    const { address, phoneNumber } = this.state;
    localStorage.setItem('address', address);
    localStorage.setItem('phoneNumber', phoneNumber);
    this.setState({ showOrders: false, isMealCanceled: true });
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

  handleCreateOrder = () => {
    const { placeOrder, history } = this.props;
    const { address, phoneNumber } = this.state;
    let meal = [], quantity = [], drink = [], prize = 0;
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails === null) {
      toastrUtil('error', 'You need to have an account to be able to place'
      + ' an order. Please signup or login to place an order', 4000);
      return history.push('/signup');
    }
    const name = userDetails.username;
    const menuItemsInCart = JSON
      .parse(localStorage.getItem('menuItemSelected'));
    menuItemsInCart.forEach((menuItem) => {
      meal.push(menuItem.meal); drink.push(menuItem.drink);
      prize += (menuItem.quantity * menuItem.prize);
      quantity.push(`${menuItem.meal}::${menuItem.quantity}`);
    });
    meal = meal[0] !== undefined ? meal.join() : 'No-meal';
    drink = drink[0] !== undefined ? drink.join() : 'No-drink';
    quantity = quantity.join();
    prize = prize.toString();
    const orderDetails = {
      address, phoneNumber, name, prize, quantity, meal, drink
    };
    placeOrder(orderDetails).then((res) => {
      if (res.code === 201) {
        this.setState({ showOrders: false, isMealCanceled: true });
        return toastrUtil('success', res.message, 3000);
      }
      toastrUtil('error', 'Could not place your order. Please try again', 4000);
    }).catch((err) => {
      toastrUtil('error', err.message, 4000);
    });
  }

  getPage = (pageNumber) => {
    const { loadMenu } = this.props;
    const itemsPreviouslySelected = JSON
      .parse(localStorage.getItem('menuItemSelected'));
    const phoneNumber = localStorage.getItem('phoneNumber') || '';
    const address = localStorage.getItem('address') || '';
    loadMenu({ page: pageNumber, }).then(() => {
      this.setState({
        isRequestSent: false,
        menuItemSelected: itemsPreviouslySelected || [],
        address,
        phoneNumber
      });
    })
      .catch(error => toastrUtil('error', error.message, 400));
  }

  render() {
    const {
      menus, menuTypeUnavailable, registeredUser, pagination,
    } = this.props;
    const {
      isRequestSent, showOrders, menuItemSelected, isMealCanceled,
      address, phoneNumber
    } = this.state;
    return (
      <div>
        <NavigationBar
          isAuthenticated={registeredUser.isAuthenticated}
          showOnAuth="View Profile"
          showOnUnauth="Login"
          showRightNavBar
        />
        <main id="menu-page-container">
          <SearchMenu
            onClick={this.handleFilterBy}
            onChange={this.handleSelectOption}
          />
          <section id="ordered-meals-container">
            <div className="menu_page-container">
              <MenuHeading menuItems={menus.length} onClick={this.showOrders} />
              {
                isRequestSent ? <Loading isRequestSent={isRequestSent} /> : null
              }
              {
                menus.length ? (
                  <CardContainer
                    menus={menus}
                    onClick={this.handleMealCardOnclick}
                    isMealCanceled={isMealCanceled}
                  />
                ) : (!isRequestSent && (
                  <div id="no-menu">
                    <h3>
                      {`There are no ${menuTypeUnavailable.toLowerCase()
                        || 'meals'} available yet.`}
                    </h3>
                    <p>
                      You can check back soon or go to your
                      <Link to="./home">Profile Page</Link>
                    </p>
                  </div>
                )
                )
              }
            </div>
          </section>
          { menus.length ? <Paginate pagination={pagination} getPage={this.getPage} /> : null }
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
  menus: state.menuReducer.menus || [],
  menuTypeUnavailable: state.menuReducer.noMenu,
  registeredUser: state.currentUser,
  pagination: state.menuReducer.pagination,
});

export const mapDispatchToProps = dispatch => ({
  loadMenu: filterBy => dispatch(menuActions.loadMenu(filterBy)),
  placeOrder: orderDetails => dispatch(placeOrderActions
    .placeOrder(orderDetails)),
});

MenuPage.propTypes = {
  loadMenu: PropTypes.func.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuTypeUnavailable: PropTypes.string.isRequired,
  placeOrder: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.object, PropTypes.number, PropTypes.string
  ]).isRequired,
  registeredUser: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ])).isRequired,
  pagination: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
