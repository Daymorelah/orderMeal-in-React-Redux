import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configuredReduxStore from '../store';

const MainApp = () => {
  return (
    <div>
      <h1>Welcome to the Authors Haven App</h1>
    </div>
  );
};

const configuredStore = configuredReduxStore();

render(
  <Provider store={configuredStore} >
    <MainApp />
  </Provider>,
  document.getElementById('app')
);
