import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../navigationBar';
import SignupForm from './signupForm';
import Footer from '../footer';
import * as signupActions from '../../actions/signupActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTyping: false,
      buttonStatus: 'Signup',
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

  handleOnsubmit(userDetails) {
    const { signupUser, history } = this.props;
    this.setState({ isTyping: false, buttonStatus: 'Signing in...' });
    signupUser(userDetails).then((response) => {
      if (response === undefined) setTimeout(() => history.push('/home'), 3000);
    });
  }

  handleOnInputChange() {
    this.setState({ isTyping: true, buttonStatus: 'Signup' });
  }

  render() {
    const { registeredUser } = this.props;
    const { isTyping, buttonStatus } = this.state;
    return (
      <div>
        <NavigationBar />
        <SignupForm
          submitUserDetails={this.handleOnsubmit}
          message={registeredUser.message}
          status={registeredUser.status}
          checkIfTyping={this.handleOnInputChange}
          isTyping={isTyping}
          buttonStatus={buttonStatus}
        />
        <Footer />
      </div>
    );
  }
}

Signup.propTypes = {
  registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  registeredUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  signupUser: userDetails => dispatch(signupActions.signupUser(userDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
