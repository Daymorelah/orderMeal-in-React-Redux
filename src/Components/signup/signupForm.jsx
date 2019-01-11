import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const signupForm = ({ submitUserDetails }) => {
  let username, password, email;
  return (
    <main>
      <div id="page-container">
        <div id="form-container">
          <div id="header-text">
            <h1>Welcome to the O-meal App.</h1>
          </div>
          <section id="success-error-response">
            <div id="response-container">
              <p>status message</p>
            </div>
          </section>
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
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                ref={(input) => { password = input; }}
              />
              <input
                type="email"
                id="email"
                placeholder="email"
                ref={(input) => { email = input; }}
              />
              <button
                id="signup-button"
                type="submit"
              >
                Signup
              </button>
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
};
export default signupForm;
