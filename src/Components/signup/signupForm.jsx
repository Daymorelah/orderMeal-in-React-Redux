import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../formInput';
import AuthButton from '../authButton';

const SignupForm = ({
  onClick, onChange, buttonStatus, username, email, password
}) => (
  <div id="signup-form-container">
    <div id="signup-header-text">
      <h1>Welcome to the O-meal App.</h1>
    </div>
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
        <AuthButton
          buttonStatus={buttonStatus}
          onClick={onClick}
          id="signup-button"
          authType="Signup"
        />
        <h3 id="login">
          Do you have an account?
          <Link to="/login">Login</Link>
        </h3>
      </form>
    </div>
  </div>
);

SignupForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonStatus: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default SignupForm;
