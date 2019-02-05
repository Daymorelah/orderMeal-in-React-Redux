import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  value, id, className, onClick
}) => (
  <button
    className={className}
    id={id}
    type="button"
    onClick={onClick}
  >
    {value}
  </button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
