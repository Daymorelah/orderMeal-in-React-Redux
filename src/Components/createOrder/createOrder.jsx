import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import GenerateMenuSelected from './generateMenuSelected';
import CartForm from './cartForm';

const CreateOrder = ({
  showOrders, menuItems, cancelOrder, createOrder, removeMenuItem,
  incrementMenuItem, decrementMenuItem, getUsersAddress, getUsersPhoneNumber,
  address, phoneNumber
}) => {
  const modalStyle = {}, noMealInCartStyle = {}, contactUserStyle = {};
  modalStyle.display = showOrders ? 'block' : 'none';
  noMealInCartStyle.display = menuItems.length ? 'none' : 'block';
  contactUserStyle.display = menuItems.length ? 'block' : 'none';
  const cancelButtonValue = menuItems.length ? 'Cancel Order' : 'Back to Menu';
  return (
    <section id="addOrder-modal-container" style={modalStyle}>
      <div id="modal-container">
        <div id="modal-content">
          <div id="success-error-response">
            <div id="response-container">
              <p />
            </div>
          </div>
          <div id="loader-container-modal">
            <div id="loader-modal" />
            <h3>loading...</h3>
          </div>
          <div id="meals-ordered-container">
            <GenerateMenuSelected
              menuItems={menuItems}
              removeMenuItem={removeMenuItem}
              incrementMenuItem={incrementMenuItem}
              decrementMenuItem={decrementMenuItem}
            />
            <div id="no-meal-in-cart" style={noMealInCartStyle}>
              <p>
                You have not selected any meals to order yet. Click the
                cancel button to go back and select a meal.
              </p>
            </div>
            <CartForm
              contactUserStyle={contactUserStyle}
              getUsersAddress={getUsersAddress}
              getUsersPhoneNumber={getUsersPhoneNumber}
              address={address}
              phoneNumber={phoneNumber}
            />
            <Button
              id="place-order"
              onClick={createOrder}
              value="Place Order"
              style={contactUserStyle}
              shouldDisable={false}
            />
            <Button
              id="cancel-order"
              onClick={cancelOrder}
              value={cancelButtonValue}
              shouldDisable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

CreateOrder.propTypes = {
  showOrders: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  cancelOrder: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  removeMenuItem: PropTypes.func.isRequired,
  incrementMenuItem: PropTypes.func.isRequired,
  decrementMenuItem: PropTypes.func.isRequired,
  getUsersPhoneNumber: PropTypes.func.isRequired,
  getUsersAddress: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default CreateOrder;
