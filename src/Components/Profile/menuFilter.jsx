import React from 'react';

const menuFilter = () => (
  <section id="filter-container">
    <div id="filter-text">
      <h2>meals ordered</h2>
    </div>
    <div id="profile-page-filter">
      <div id="filter-input">
        <input
          type="text"
          id="search-by"
          placeholder="Enter search here"
        />
        <input
          type="date"
          id="filter-by-date"
          placeholder="Enter date here"
        />
      </div>
      <div id="filter-by">
        <select id="filter-by-detail">
          <option value="Meal">Meal</option>
          <option value="Meal">Prize</option>
          <option value="Meal">Destination</option>
        </select>
        <span id="search">
          <i className="fas fa-search fa-2x" />
        </span>
      </div>
    </div>
  </section>
);

export default menuFilter;
