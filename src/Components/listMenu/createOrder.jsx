import React from 'react';

const CreateOrder = () => (
  <section id="addOrder-modal-container">
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
          <div id="meals-ordered" />
          <div id="no-meal-in-cart">
            <p>
              You have not selected any meals to order yet. Click the
              cancel button to go back and select a meal.
            </p>
          </div>
          <div id="contact-user">
            <p>Where do you want your order sent to?</p>
            <input type="text" id="address" />
            <p>Phone number</p>
            <input type="number" id="phone-number" maxLength="13" />
          </div>
          <button type="button" id="place-order">Place Order</button>
          <button type="button" id="cancel-order">Cancel Order</button>
        </div>
      </div>
    </div>
  </section>
);

export default CreateOrder;
