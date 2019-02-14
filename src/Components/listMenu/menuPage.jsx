import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastrUtil from '../../utilities/toastrUtil';
import CardContainer from './cardContainer';
import MenuHeading from './menuHeading';
import Paginate from '../paginate';
import SearchMenu from './searchMenu';
import NavigationBar from '../navigationBar';
import Loading from '../loading';
import CreateOrder from '../createOrder/createOrder';
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
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    const itemsPreviouslySelected = JSON
      .parse(localStorage.getItem('menuItemSelected'));
    const phoneNumber = localStorage.getItem('phoneNumber') || '';
    const address = localStorage.getItem('address') || '';
    loadMenu(filterBy)
      .then(() => {
        this.setState({
          isRequestSent: false,
          menuItemSelected: itemsPreviouslySelected || [],
          address,
          phoneNumber
        });
      })
      .catch(error => toastrUtil('error', error.message, 4000));
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
        toastrUtil('success', res.message, 3000);
        return history.push('/profile');
      }
      toastrUtil('error', 'Could not place your order. Please try again', 4000);
    }).catch((err) => {
      toastrUtil('error', err.message, 4000);
    });
  }

  render() {
    const { menu, menuTypeUnavailable, registeredUser } = this.props;
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
  registeredUser: state.currentUser,
});

export const mapDispatchToProps = dispatch => ({
  loadMenu: filterBy => dispatch(menuActions.loadMenu(filterBy)),
  placeOrder: orderDetails => dispatch(placeOrderActions
    .placeOrder(orderDetails)),
});

MenuPage.propTypes = {
  loadMenu: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuTypeUnavailable: PropTypes.string.isRequired,
  placeOrder: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.object, PropTypes.number, PropTypes.string
  ]).isRequired,
  registeredUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
