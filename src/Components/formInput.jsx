import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  onChange, placeHolder, id, type, value, readOnly,
}) => (
  <input
    type={type}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeHolder}
    readOnly={readOnly}
  />
);

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default FormInput;
