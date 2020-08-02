import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavigationBar = ({
  isAuthenticated, showOnAuth, showOnUnauth, showRightNavBar
}) => (
  <header>
    <nav>
      <div id="logo">
        <Link to="/menu">O-Meal</Link>
      </div>
      { showRightNavBar ? (
        <div id="nav-menu">
          {
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
          }
        </div>
      ) : null
      }
    </nav>
  </header>
);

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  showOnAuth: PropTypes.string,
  showOnUnauth: PropTypes.string,
  showRightNavBar: PropTypes.bool.isRequired,
};

NavigationBar.defaultProps = {
  showOnAuth: '',
  showOnUnauth: '',
};

export default NavigationBar;
