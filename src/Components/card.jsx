import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const Card = ({
  name, category, prize, onClick, isMealCanceled, photo,
}) => {
  const style = {};
  if (isMealCanceled === true) style.display = 'block';
  return (
    <div className="meal-cards">
      <div className="card-heading">
        <img src={photo} alt={`menu-${category}`} />
      </div>
      <div className="card-body">
        <p>
          <span className="meal-property">
            {`${category}: `}
          </span>
          {name}
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
          style={style}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  prize: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isMealCanceled: PropTypes.bool.isRequired,
  photo: PropTypes.string.isRequired,
};

export default Card;
