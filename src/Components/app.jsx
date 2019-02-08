import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about';
import HomePage from './home';
import SignupPage from './signup/signupPage';
import LoginPage from './login/loginPage';
import MenuPage from './listMenu/menuPage';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/menu" component={MenuPage} />
      <Route component={MenuPage} />
    </Switch>
  </div>
);

export default App;
