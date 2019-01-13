import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about';
import HomePage from './home';
import SignupPage from './signup/signup';

const App = () => (
  <div>
    <Switch>
      <Route path="/about" component={AboutPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  </div>
);

export default App;
