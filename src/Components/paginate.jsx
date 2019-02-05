import React from 'react';

const paginate = () => (
  <section id="paginate-container">
    <div id="paginate">
      <span className="page">1</span>
      <span className="page">2</span>
      <span className="page">3</span>
      <span className="page">
        <i className="fas fa-ellipsis-h" />
      </span>
      <span className="page">
        <a href="#ordered-meal-text">
          <i className="fas fa-chevron-up" />
        </a>
      </span>
    </div>
  </section>
);

export default paginate;
