import React from 'react';
import { render } from 'react-dom';

const MainApp = () => {
  return (
    <div>
      <h1>Welcome to the Authors Haven App</h1>
    </div>
  );
};

render(<MainApp />, document.getElementById('app'));
