import React from 'react';
import PropTypes from 'prop-types';

const SignupButton = ({
  buttonStatus, onClick, id, authType
}) => {
  const buttonAuthType = authType === 'Signup' ? 'Signup' : 'Login';
  const buttonStyle = {};
  if (buttonStatus !== buttonAuthType) buttonStyle.disabled = true;
  return (
    <button
      id={id}
      type="submit"
      {...buttonStyle}
      onClick={onClick}
    >
      {buttonStatus}
    </button>
  );
};

SignupButton.propTypes = {
  buttonStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  authType: PropTypes.string.isRequired,
};

export default SignupButton;
