import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const MenuHeading = ({ menuItems, onClick }) => (
  <div id="ordered-meal-text">
    <h3>{`meals available | ${menuItems}`}</h3>
    <h3
      id="add-order"
      onClick={onClick}
      onKeyPress={onClick}
    >
    Place order
    </h3>
  </div>
);

MenuHeading.propTypes = {
  menuItems: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MenuHeading;
