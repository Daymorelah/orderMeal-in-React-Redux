import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Components/app.jsx';
import configuredReduxStore from './store';

const configuredStore = configuredReduxStore();

render(
  <Provider store={configuredStore} >
    <Router basename="/client">
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
