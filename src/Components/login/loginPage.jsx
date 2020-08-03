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
    email: '',
    password: '',
  };

  state = {
    buttonStatus: 'Login',
    makeInputsReadOnly: false,
    ...this.initialState,
  };

  componentDidMount() {
    const { registeredUser, history, location: { search } } = this.props;
    if (registeredUser.isAuthenticated || localStorage.getItem('userDetails')) {
      history.push('/menu');
    }
    this.showMessage(search);
  }

  /**
   * This method is called when a registered user is redirected to
   * the login page.
   */
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

  handleOnsubmit = async (event) => {
    event.preventDefault();
    this.setState({
      makeInputsReadOnly: true,
      buttonStatus: 'Logging in...'
    });
    const { loginUser, history } = this.props;
    const { password, email } = this.state;
    try {
      const res = await loginUser({ password, email }, 'login');
      if (res.success) {
        toastr('success', 'Login successful');
        localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
        localStorage.setItem('token', res.token);
        return history.push('/menu');
      }
    } catch (err) {
      toastr('error',
        err.message
        || err.errors[0].email
        || err.errors[0].password
        || err);
      return this.setState({
        buttonStatus: 'Login',
        makeInputsReadOnly: false,
        ...LoginPage.initialState
      });
    }
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
    const { buttonStatus, makeInputsReadOnly, } = this.state;
    return (
      <div>
        <NavigationBar
          isAuthenticated={registeredUser.isAuthenticated}
          showRightNavBar={false}
        />
        <LoginForm
          onClick={this.handleOnsubmit}
          onChange={this.handleOnInputChange}
          buttonStatus={buttonStatus}
          makeInputsReadOnly={makeInputsReadOnly}
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
