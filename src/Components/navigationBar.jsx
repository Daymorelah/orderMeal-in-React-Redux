import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavigationBar = ({
  isAuthenticated, showOnAuth, showOnUnauth, showRightNavBar
}) => (
  <header>
    <nav>
      <div id="logo">
        <Link to="landingPage">O-Meal</Link>
      </div>
      <div id="nav-menu">
        {
        // eslint-disable-next-line no-nested-ternary
        showRightNavBar
          ? (
            isAuthenticated || localStorage.getItem('userDetails')
              ? (
                <div id="logout">
                  <Link to="/home">{showOnAuth}</Link>
                </div>
              ) : (
                <div id="logout">
                  <Link to="/login">{showOnUnauth}</Link>
                </div>
              )
          ) : (<div />)
        }
      </div>
    </nav>
  </header>
);

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  showOnAuth: PropTypes.string.isRequired,
  showOnUnauth: PropTypes.string.isRequired,
  showRightNavBar: PropTypes.bool.isRequired,
};

export default NavigationBar;
