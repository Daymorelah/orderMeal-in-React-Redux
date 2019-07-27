import React from 'react';
import PropType from 'prop-types';
import Card from '../card';

const CardContainer = ({
  menu, onClick, isMealCanceled
}) => (
  <div id="meal-card-container">
    {
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
    }
  </div>
);

CardContainer.propTypes = {
  menu: PropType.arrayOf(PropType.object).isRequired,
  onClick: PropType.func.isRequired,
  isMealCanceled: PropType.bool.isRequired,
};

export default CardContainer;
