import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utilities/toastrUtil';
import LoginForm from './loginForm';
import NavigationBar from '../navigationBar';
import getPayload from '../../utilities/decodeJwt';
import Footer from '../footer';
import authentication from '../../actions/authActions';

export class LoginPage extends Component {
  initialState = {
    username: '',
    password: '',
  };

  state = {
    isTyping: false,
    buttonStatus: 'Login',
    status: '',
    ...this.initialState,
  };

  componentDidMount() {
    const { registeredUser, history, location: { search } } = this.props;
    if (registeredUser.isAuthenticated || localStorage.getItem('userDetails')) {
      history.push('/menu');
    }
    this.showMessage(search);
  }

  showMessage = (search) => {
    const params = new URLSearchParams(search);
    const status = params.has('stat') ? params.get('stat') : null;
    if (status !== null) {
      try {
        const payload = getPayload(status);
        if (!payload.success && payload.message) {
          return toastr('error', payload.message);
        }
      } catch (err) { return false; }
    }
  }

  handleOnsubmit = (event) => {
    event.preventDefault();
    const { loginUser, history } = this.props;
    this.setState({
      isTyping: false,
      status: true,
      buttonStatus: 'Logging in...'
    });
    const { username, password, email } = this.state;
    loginUser({ username, password, email }, 'login').then((response) => {
      if (response === undefined) {
        this.setState({ status: true });
        toastr('success', 'yay!', 3000);
        return history.push('/menu');
      }
      this.setState({ buttonStatus: 'Login', status: false });
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
    const { isTyping, buttonStatus, status } = this.state;
    return (
      <div>
        <NavigationBar
          isAuthenticated={registeredUser.isAuthenticated}
          showOnAuth=""
          showOnUnauth=""
          showRightNavBar={false}
        />
        <LoginForm
          onClick={this.handleOnsubmit}
          message={registeredUser.message}
          status={status}
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
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ])).isRequired,
};

export const mapStateToProps = state => ({
  registeredUser: state.currentUser
});

export const mapDispatchToProps = dispatch => ({
  loginUser: (userDetails, authType) => dispatch(
    authentication(userDetails, authType)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
