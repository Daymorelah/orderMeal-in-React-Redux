import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../formInput';
import SignupStatus from './signupStatus';
import SignupButton from './signupButton';

const SignupForm = ({
  onClick, message, status, onChange, isTyping, buttonStatus,
  username, email, password
}) => (
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
          <form>
            <FormInput
              type="text"
              id="username"
              placeHolder="username"
              value={username}
              onChange={onChange}
              required
            />
            <FormInput
              type="password"
              id="password"
              placeHolder="password"
              value={password}
              onChange={onChange}
              required
            />
            <FormInput
              type="email"
              id="email"
              placeHolder="email"
              value={email}
              onChange={onChange}
              required
            />
            <SignupButton buttonStatus={buttonStatus} onClick={onClick} />
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

SignupForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  buttonStatus: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default SignupForm;
