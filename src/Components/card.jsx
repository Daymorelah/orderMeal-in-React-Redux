import React from 'react';

const Card = () => (
  <div>
    <div className="meal-cards">
      <div className="card-heading">
        <h2>
          <span className="meal-property">type: </span>
            Appetizer
        </h2>
      </div>
      <div className="card-body">
        <p>
          <span className="meal-property">Appetizer: </span>
            fruit salad
        </p>
        <p>
          <span className="meal-property">Prize: </span>
          &#8358; 300
        </p>
      </div>
      <div className="card-footer">
        <button className="add-to-cart" id="card-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

export default Card;
