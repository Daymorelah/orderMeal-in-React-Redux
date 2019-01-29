import React from 'react';
import PropTypes from 'prop-types';
import toastr from '../../utilities/toastrUtil';

const SignupStatus = ({ statusMessage, status, isTyping }) => {
  let classToApply = '';
  const response = {};

  if (isTyping) response.display = 'none';

  if (status === true && !isTyping) {
    classToApply = 'success-response';
    response.display = 'block';
    toastr('success', statusMessage, 3000);
  }
  if (status === false && !isTyping) {
    classToApply = 'error-response';
    response.display = 'block';
  }

  return (
    <section id="success-error-response">
      <div id="response-container" style={response} className={classToApply}>
        <p>{statusMessage}</p>
      </div>
    </section>
  );
};

SignupStatus.propTypes = {
  statusMessage: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  isTyping: PropTypes.bool.isRequired,
};

export default SignupStatus;
