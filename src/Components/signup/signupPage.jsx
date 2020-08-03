import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utilities/toastrUtil';
import NavigationBar from '../navigationBar';
import SignupForm from './signupForm';
import Footer from '../footer';
import getPayload from '../../utilities/decodeJwt';
import authentication from '../../actions/authActions';

export class SignupPage extends Component {
  static initialState = {
    username: '',
    password: '',
    email: '',
  };

  state = {
    buttonStatus: 'Signup',
    makeInputsReadOnly: false,
    ...SignupPage.initialState,
  };

  async componentDidMount() {
    const { registeredUser, history, location: { search } } = this.props;
    if (registeredUser.isAuthenticated
      || localStorage.getItem(process.env.IS_AUTHENTICATED)) {
      return history.push('/menu');
    }
    this.showMessage(search);
  }

  showMessage = (search) => {
    const params = new URLSearchParams(search);
    const status = params.has('stat') ? params.get('stat') : null;
    if (status !== null) {
      try {
        const { history, } = this.props;
        const payload = getPayload(status);
        if (payload.success) {
          toastr('success', payload.message);
          return history.push('/menu');
        }
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
      buttonStatus: 'Signing in...'
    });
    const { signupUser, history } = this.props;
    const { password, email, username } = this.state;
    try {
      const res = await signupUser(
        { password, email, username, }, 'signup'
      );
      if (res.success) {
        toastr('success', 'Signup successful');
        localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
        localStorage.setItem('token', res.token);
        return history.push('/menu');
      }
    } catch (err) {
      toastr('error',
        err.message
        || err.errors[0].email
        || err.errors[0].password
        || err.errors[0].username
        || err);
      return this.setState({
        buttonStatus: 'Signup',
        makeInputsReadOnly: false,
        ...SignupPage.initialState
      });
    }
  }

  handleOnInputChange = (event) => {
    this.setState({
      buttonStatus: 'Signup',
      [event.target.id]: event.target.value
    });
  }

  render() {
    const { registeredUser } = this.props;
    const { makeInputsReadOnly, buttonStatus, } = this.state;
    return (
      <div>
        <NavigationBar
          isAuthenticated={registeredUser.isAuthenticated}
          showRightNavBar={false}
        />
        <main>
          <div id="signup-page-container">
            <div id="signup-pic-container">
              <img
                src={`${process.env.CLOUDINARY_URL}/image/upload/w_0.5,h_0.5/`
                + 'v1561976366/o-meal/landing_page.svg'}
                alt="landing_pic"
              />
            </div>
            <SignupForm
              onClick={this.handleOnsubmit}
              message={registeredUser.message}
              makeInputsReadOnly={makeInputsReadOnly}
              onChange={this.handleOnInputChange}
              buttonStatus={buttonStatus}
              {...this.state}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

SignupPage.propTypes = {
  registeredUser: PropTypes.objectOf(PropTypes.any).isRequired,
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number, PropTypes.string, PropTypes.func, PropTypes.object
  ])).isRequired,
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ])).isRequired,
};

export const mapStateToProps = state => ({
  registeredUser: state.currentUser
});

export const mapDispatchToProps = dispatch => ({
  signupUser: (userDetails, authType) => dispatch(
    authentication(userDetails, authType)
  ),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
