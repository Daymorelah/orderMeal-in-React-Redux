import React from 'react';
import PropType from 'prop-types';
import Card from '../card';

const CardContainer = ({
  menus, onClick, isMealCanceled
}) => (
  <div id="meal-card-container">
    {
      menus.map(menuItem => (
        <Card
          key={menuItem.id}
          name={menuItem.name}
          category={menuItem.category}
          prize={menuItem.prize}
          onClick={event => onClick(event, menuItem)}
          isMealCanceled={isMealCanceled}
          photo={menuItem.photo}
        />
      ))
    }
  </div>
);

CardContainer.propTypes = {
  menus: PropType.arrayOf(PropType.object).isRequired,
  onClick: PropType.func.isRequired,
  isMealCanceled: PropType.bool.isRequired,
};

export default CardContainer;
