import React from 'react';
import PropTypes from 'prop-types';

const CartForm = ({
  contactUserStyle, getUsersAddress, getUsersPhoneNumber, address,
  phoneNumber, addressInLocalStorage, phoneNumberInLocalStorage
}) => (
  <div id="contact-user" style={contactUserStyle}>
    <p>Where do you want your order sent to?</p>
    <input
      type="text"
      id="address"
      onChange={getUsersAddress}
      value={ address ? address : addressInLocalStorage || ''}
    />
    <p>Phone number</p>
    <input
      type="number"
      id="phone-number"
      maxLength="13"
      onChange={getUsersPhoneNumber}
      value={phoneNumber
        ? phoneNumber : phoneNumberInLocalStorage || ''}
    />
  </div>
);

CartForm.propTypes = {
  contactUserStyle: PropTypes.objectOf(PropTypes.string).isRequired,
  getUsersAddress: PropTypes.func.isRequired,
  getUsersPhoneNumber: PropTypes.func.isRequired,
  address: PropTypes.string,
  phoneNumber: PropTypes.string,
  addressInLocalStorage: PropTypes.string,
  phoneNumberInLocalStorage: PropTypes.string,
};

CartForm.defaultProps = {
  addressInLocalStorage: '',
  phoneNumberInLocalStorage: '',
  address: '',
  phoneNumber: '',
};
export default CartForm;
