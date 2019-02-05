import React from 'react';
import PropTypes from 'prop-types';

const SearchMenu = ({ onClick, onChange }) => (
  <section id="search-container">
    <div className="container">
      <div id="search-meal-container">
        <input
          type="text"
          id="search-meal"
          placeholder="Search available meals"
        />
        <span
          id="search-meal-icon"
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyPress={onClick}
        >
          <i className="fas fa-search" />
        </span>
        <select id="filter" onChange={onChange}>
          <option value="">filter by</option>
          <option value="Meal">Meal</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Drink">Refreshment</option>
          <option value="Snacks">Snacks</option>
          <option value="Desert">Desert</option>
        </select>
      </div>
    </div>
  </section>
);

SearchMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchMenu;
