import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  onChange, placeHolder, id, type, value
}) => (
  <input
    type={type}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeHolder}
    required
  />
);

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default FormInput;
