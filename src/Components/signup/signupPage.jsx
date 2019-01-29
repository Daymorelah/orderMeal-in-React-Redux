import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../navigationBar';
import SignupForm from './signupForm';
import Footer from '../footer';
import * as signupActions from '../../actions/signupActions';

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
      ...this.initialState,
    };
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }

  componentDidMount() {
    const { registeredUser, history } = this.props;
    if (registeredUser.isAuthenticated || localStorage.getItem('token')) {
      history.push('/home');
    }
  }

  handleOnsubmit(event) {
    event.preventDefault();
    const { signupUser, history } = this.props;
    this.setState({ isTyping: false, buttonStatus: 'Signing in...' });
    const { username, password, email } = this.state;
    signupUser({ username, password, email }).then((response) => {
      if (response === undefined) {
        history.push('/home');
      }
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
    const { isTyping, buttonStatus } = this.state;
    return (
      <div>
        <NavigationBar />
        <SignupForm
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
  signupUser: userDetails => dispatch(signupActions.signupUser(userDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
