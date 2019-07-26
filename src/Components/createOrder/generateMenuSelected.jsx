import React from 'react';
import PropTypes from 'prop-types';

const GenerateMenuSelected = ({
  menuItems, incrementMenuItem, decrementMenuItem, removeMenuItem
}) => {
  let total = 0;
  return (
    <div id="meals-ordered">
      {menuItems.map((menuItem) => {
        const menuTotal = menuItem.prize * menuItem.quantity;
        total += menuTotal;
        return (
          <div className="meal-ordered" key={menuItem.id}>
            <p>
              {`${menuItem.meal_type}: ${menuItem.meal}`}
            </p>
            <div className="meal-quantity-container">
              <p> Quantity: </p>
              <div className="meal-quantity">
                <span
                  className="add"
                  onClick={() => incrementMenuItem(menuItem.id)}
                  onKeyPress={() => incrementMenuItem(menuItem.id)}
                  role="button"
                  tabIndex={0}
                >
                  <i className="fas fa-plus fa-xs" />
                </span>
                <span className="number">
                  {menuItem.quantity}
                </span>
                <span
                  className="reduce"
                  onClick={() => decrementMenuItem(menuItem.id)}
                  onKeyPress={() => decrementMenuItem(menuItem.id)}
                  role="button"
                  tabIndex={0}
                >
                  <i className="fas fa-minus fa-xs" />
                </span>
                <span
                  className="remove-meal"
                  onClick={() => removeMenuItem(menuItem.id)}
                  onKeyPress={() => removeMenuItem(menuItem.id)}
                  role="button"
                  tabIndex={0}
                >
                  <i className="fas fa-times fa-xs" />
                </span>
              </div>
            </div>
            <p>{`Prize: ₦${menuTotal}`}</p>
          </div>
        );
      })
      }
      {menuItems.length ? (
        <p id="menu-total">
          {`Total: ₦${total}`}
        </p>
      ) : null
      }
    </div>
  );
};

GenerateMenuSelected.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeMenuItem: PropTypes.func.isRequired,
  decrementMenuItem: PropTypes.func.isRequired,
  incrementMenuItem: PropTypes.func.isRequired,
};

export default GenerateMenuSelected;
