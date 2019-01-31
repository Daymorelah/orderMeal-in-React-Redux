import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about';
import HomePage from './home';
import SignupPage from './signup/signupPage';
import LoginPage from './login/loginPage';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </div>
);

export default App;
