import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../formInput';
import AuthButton from '../authButton';
import AuthStatus from '../authStatus';

const LoginForm = ({
  onClick, message, status, onChange, isTyping, buttonStatus,
  username, password
}) => (
  <main>
    <div id="page-container">
      <div id="form-container">
        <div id="header-text">
          <h1>Welcome to the O-meal App.</h1>
        </div>
        <AuthStatus
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
            <AuthButton
              buttonStatus={buttonStatus}
              onClick={onClick}
              id="login-button"
              authType="Login"
            />
            <h3 id="signup">
              Do you have an account?
              <Link to="/signup">signup</Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  </main>
);

LoginForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  buttonStatus: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
