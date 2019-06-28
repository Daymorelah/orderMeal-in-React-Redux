import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utilities/toastrUtil';
import NavigationBar from '../navigationBar';
import SignupForm from './signupForm';
import Footer from '../footer';
import * as authActions from '../../actions/authActions';

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: '',
      password: '',
      email: '',
    };
    this.state = {
      isTyping: false,
      buttonStatus: 'Signup',
      status: '',
      ...this.initialState,
    };
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }

  componentDidMount() {
    const { registeredUser, history } = this.props;
    if (registeredUser.isAuthenticated || localStorage.getItem('userDetails')) {
      history.push('/menu');
    }
  }

  handleOnsubmit(event) {
    event.preventDefault();
    const { signupUser, history } = this.props;
    this.setState({
      sTyping: false,
      status: true,
      buttonStatus: 'Signing in...'
    });
    const { username, password, email } = this.state;
    signupUser({ username, password, email }, 'signup').then((response) => {
      if (response === undefined) {
        toastr('success', 'yay!', 3000);
        return history.push('/menu');
      }
      this.setState({ buttonStatus: 'Signup', status: false });
    });
  }

  handleOnInputChange(event) {
    this.setState({
      isTyping: true,
      buttonStatus: 'Signup',
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
              status={status}
              onChange={this.handleOnInputChange}
              isTyping={isTyping}
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
  history: PropTypes.oneOfType([
    PropTypes.object, PropTypes.number, PropTypes.string
  ]).isRequired,
};

export const mapStateToProps = state => ({
  registeredUser: state.currentUser
});

export const mapDispatchToProps = dispatch => ({
  signupUser: (userDetails, authType) => dispatch(authActions
    .authUser(userDetails, authType))
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
