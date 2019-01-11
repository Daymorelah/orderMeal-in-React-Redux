import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <header>
      <nav>
        <div id="logo">
          <Link to="landingPage">O-Meal</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
