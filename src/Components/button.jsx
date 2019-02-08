import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  value, id, className, onClick, style
}) => (
  <button
    className={className}
    id={id}
    type="button"
    onClick={onClick}
    style={style}
  >
    {value}
  </button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string)
};

Button.defaultProps = {
  className: '',
  style: {},
};

export default Button;
