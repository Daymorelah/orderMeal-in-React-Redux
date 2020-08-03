import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../formInput';
import AuthButton from '../authButton';

const LoginForm = ({
  onClick, onChange, buttonStatus,
  makeInputsReadOnly, email, password
}) => (
  <main>
    <div id="login-page-container">
      <div id="form-container">
        <div id="header-text">
          <h1>Welcome to the O-meal App.</h1>
        </div>
        <div id="login-form">
          <h2>please login</h2>
          <form>
            <FormInput
              type="text"
              id="email"
              placeHolder="email"
              value={email}
              onChange={onChange}
              required
              readOnly={makeInputsReadOnly}
            />
            <FormInput
              type="password"
              id="password"
              placeHolder="password"
              value={password}
              onChange={onChange}
              required
              readOnly={makeInputsReadOnly}
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
  onChange: PropTypes.func.isRequired,
  buttonStatus: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  makeInputsReadOnly: PropTypes.bool.isRequired,
};

export default LoginForm;
