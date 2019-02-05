import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const Card = ({
  meal, mealType, prize, onClick
}) => (
  <div className="meal-cards">
    <div className="card-heading">
      <h2>
        <span className="meal-property">type: </span>
        {mealType}
      </h2>
    </div>
    <div className="card-body">
      <p>
        <span className="meal-property">
          {`${mealType}: `}
        </span>
        {meal}
      </p>
      <p>
        <span className="meal-property">Prize: </span>
        &#8358;
        {` ${prize}`}
      </p>
    </div>
    <div className="card-footer">
      <Button
        id="card-button"
        value="Add to cart"
        className="add-to-cart"
        onClick={onClick}
      />
    </div>
  </div>
);

Card.propTypes = {
  meal: PropTypes.string.isRequired,
  mealType: PropTypes.string.isRequired,
  prize: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
