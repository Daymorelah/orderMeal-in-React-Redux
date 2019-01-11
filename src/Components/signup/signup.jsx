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
    this.handleOnsubmitUserDetails = this.handleOnsubmitUserDetails.bind(this);
  }

  handleOnsubmitUserDetails(userDetails) {
    const { signupUser } = this.props;
    signupUser(userDetails);
  }

  render() {
    const { registeredUsers } = this.props;
    return (
      <div>
        <NavigationBar />
        <SignupForm submitUserDetails={this.handleOnsubmitUserDetails} />
        {registeredUsers}
        <Footer />
      </div>
    );
  }
}

Signup.propTypes = {
  registeredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  registeredUsers: state.users
});

const mapDispatchToProps = dispatch => ({
  signupUser: userDetails => dispatch(signupActions.signupUser(userDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
