import React from 'react';
import PropTypes from 'prop-types';

const SignupButton = ({ buttonStatus }) => {
  const buttonStyle = {};
  if (buttonStatus !== 'Signup') buttonStyle.disabled = 'true';
  return (
    <button
      id="signup-button"
      type="submit"
      {...buttonStyle}
    >
      {buttonStatus}
    </button>
  );
};

SignupButton.propTypes = {
  buttonStatus: PropTypes.string.isRequired,
};

export default SignupButton;
