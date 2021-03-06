import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Components/app';
import configuredReduxStore from './store';
import './style/main.scss';

const configuredStore = configuredReduxStore();
render(
  <Provider store={configuredStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
