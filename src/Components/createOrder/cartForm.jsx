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
      value={address.length ? address : addressInLocalStorage || ''}
    />
    <p>Phone number</p>
    <input
      type="number"
      id="phone-number"
      maxLength="13"
      onChange={getUsersPhoneNumber}
      value={phoneNumber.length
        ? phoneNumber : phoneNumberInLocalStorage || ''}
    />
  </div>
);

CartForm.propTypes = {
  contactUserStyle: PropTypes.objectOf(PropTypes.string).isRequired,
  getUsersAddress: PropTypes.func.isRequired,
  getUsersPhoneNumber: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  addressInLocalStorage: PropTypes.string.isRequired,
  phoneNumberInLocalStorage: PropTypes.string.isRequired,
};

export default CartForm;
