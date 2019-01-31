import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import NavigationBar from '../navigationBar';
import Footer from '../footer';
import * as authActions from '../../actions/authActions';

export class LoginPage extends Component {
  initialState = {
    username: '',
    password: '',
  };

  state = {
    isTyping: false,
    buttonStatus: 'Login',
    ...this.initialState,
  };

  componentDidMount() {
    const { registeredUser, history } = this.props;
    if (registeredUser.isAuthenticated || localStorage.getItem('token')) {
      history.push('/home');
    }
  }

  handleOnsubmit = (event) => {
    event.preventDefault();
    const { loginUser, history } = this.props;
    this.setState({ isTyping: false, buttonStatus: 'Logging in...' });
    const { username, password, email } = this.state;
    loginUser({ username, password, email }, 'login').then((response) => {
      if (response === undefined) {
        history.push('/home');
      }
    });
  }

  handleOnInputChange = (event) => {
    this.setState({
      isTyping: true,
      buttonStatus: 'Login',
      [event.target.id]: event.target.value
    });
  }

  render() {
    const { registeredUser } = this.props;
    const { isTyping, buttonStatus } = this.state;
    return (
      <div>
        <NavigationBar />
        <LoginForm
          onClick={this.handleOnsubmit}
          message={registeredUser.message}
          status={registeredUser.status}
          onChange={this.handleOnInputChange}
          isTyping={isTyping}
          buttonStatus={buttonStatus}
          {...this.state}
        />
        <Footer />
      </div>
    );
  }
}

LoginPage.propTypes = {
  registeredUser: PropTypes.objectOf(PropTypes.any).isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.object, PropTypes.number, PropTypes.string
  ]).isRequired,
};

export const mapStateToProps = state => ({
  registeredUser: state.currentUser
});

export const mapDispatchToProps = dispatch => ({
  loginUser: (userDetails, authType) => dispatch(authActions
    .authUser(userDetails, authType))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
