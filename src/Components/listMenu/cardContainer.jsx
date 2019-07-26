import React from 'react';
import PropType from 'prop-types';
import Card from '../card';

const CardContainer = ({
  menu, onClick, menuTypeUnavailable, isMealCanceled
}) => (
  <div id="meal-card-container">
    { menuTypeUnavailable.length
      ? (
        <div id="no-menu">
          <h3>
            {`There are no ${menuTypeUnavailable} available yet.`}
          </h3>
          <p>
              You can check back soon or go to your
            <a // eslint-disable-line jsx-a11y/anchor-is-valid
              href="#"
            >
                Profile page
            </a>
          </p>
        </div>
      )
      : (
        menu.map(menuItem => (
          <Card
            key={menuItem.id}
            meal={menuItem.meal}
            mealType={menuItem.meal_type}
            prize={menuItem.prize}
            onClick={event => onClick(event, menuItem)}
            isMealCanceled={isMealCanceled}
            photo={menuItem.menu_photo}
          />
        ))
      )
        }
  </div>
);

CardContainer.propTypes = {
  menu: PropType.arrayOf(PropType.object).isRequired,
  onClick: PropType.func.isRequired,
  menuTypeUnavailable: PropType.string.isRequired,
  isMealCanceled: PropType.bool.isRequired,
};

export default CardContainer;
