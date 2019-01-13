import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupStatus from './signupStatus';
import SignupButton from './signupButton';

const signupForm = ({
  submitUserDetails, message, status, checkIfTyping, isTyping, buttonStatus
}) => {
  let username, password, email;
  return (
    <main>
      <div id="page-container">
        <div id="form-container">
          <div id="header-text">
            <h1>Welcome to the O-meal App.</h1>
          </div>
          <SignupStatus
            statusMessage={message}
            status={status}
            isTyping={isTyping}
          />
          <div id="signup-form">
            <h2>please signup</h2>
            <form onSubmit={(event) => {
              event.preventDefault();
              const userDetails = {
                username: username.value,
                password: password.value,
                email: email.value
              };
              submitUserDetails(userDetails);
            }}
            >
              <input
                type="text"
                id="username"
                placeholder="username"
                ref={(input) => { username = input; }}
                onChange={checkIfTyping}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                ref={(input) => { password = input; }}
                onChange={checkIfTyping}
                required
              />
              <input
                type="email"
                id="email"
                placeholder="email"
                ref={(input) => { email = input; }}
                onChange={checkIfTyping}
                required
              />
              <SignupButton buttonStatus={buttonStatus} />
              <h3 id="login">
                Do you have an account?
                <Link to="login">Login</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

signupForm.propTypes = {
  submitUserDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  checkIfTyping: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  buttonStatus: PropTypes.string.isRequired,
};
export default signupForm;
