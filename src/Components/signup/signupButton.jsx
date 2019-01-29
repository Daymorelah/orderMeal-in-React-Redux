import React from 'react';
import PropTypes from 'prop-types';

const SignupButton = ({ buttonStatus, onClick }) => {
  const buttonStyle = {};
  if (buttonStatus !== 'Signup') buttonStyle.disabled = true;
  return (
    <button
      id="signup-button"
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
};

export default SignupButton;
