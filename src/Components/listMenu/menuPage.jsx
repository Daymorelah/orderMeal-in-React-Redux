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
import CreateOrder from './createOrder';
import Footer from '../footer';
import * as menuActions from '../../actions/menuActions';

export class MenuPage extends Component {
  state= {
    isRequestSent: true,
    filterBy: ''
  };

  componentDidMount() {
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    loadMenu(filterBy)
      .then(() => this.setState({ isRequestSent: false }))
      .catch(error => toastr('error', error.message, 4000));
  }

  handleFilterBy = () => {
    const { loadMenu } = this.props;
    const { filterBy } = this.state;
    this.setState({ isRequestSent: true });
    loadMenu(filterBy)
      .then(() => this.setState({ isRequestSent: false }))
      .catch((error) => {
        console.log('i got caught in catch ==> ', error.message);
        this.setState({ isRequestSent: false });
        toastr('error', error.message, 4000);
      });
  }

  handleSelectOption = (event) => {
    this.setState({ filterBy: event.target.value });
  }

  handleMealCardOnclick = () => {}

  render() {
    const { menu, menuTypeUnavailable } = this.props;
    const { isRequestSent } = this.state;
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
              <MenuHeading menuItems={menu.length} />
              {
                isRequestSent ? <Loading isRequestSent={isRequestSent} />
                  : (
                    <CardContainer
                      menu={menu}
                      menuTypeUnavailable={menuTypeUnavailable}
                      onClick={this.handleMealCardOnclick}
                    />
                  )
              }
            </div>
          </section>
          <Paginate />
          <CreateOrder />
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
