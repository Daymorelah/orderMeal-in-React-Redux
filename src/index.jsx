import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Components/app.jsx';
import configuredReduxStore from './store';
import './style/signupPage.css';

const configuredStore = configuredReduxStore();
console.log('state is is ==> ', configuredStore.getState());
render(
  <Provider store={configuredStore} >
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
