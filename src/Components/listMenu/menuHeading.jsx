import React from 'react';
import PropTypes from 'prop-types';

const MenuHeading = ({ menuItems }) => (
  <div id="ordered-meal-text">
    <h3>{`meals available | ${menuItems}`}</h3>
    <h3 id="add-order">Place order</h3>
  </div>
);

MenuHeading.propTypes = {
  menuItems: PropTypes.number.isRequired
};

export default MenuHeading;
