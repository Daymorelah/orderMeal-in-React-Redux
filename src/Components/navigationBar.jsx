import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <header>
    <nav>
      <div id="logo">
        <Link to="landingPage">O-Meal</Link>
      </div>
    </nav>
  </header>
);

export default NavigationBar;
