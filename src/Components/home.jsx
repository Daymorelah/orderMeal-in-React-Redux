import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>This is the Home page for the app</h1>
    <br />
    <p>
      Click
      <Link to="/menu"> here </Link>
      to view menu
    </p>
  </div>
);

export default HomePage;
