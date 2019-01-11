import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../Components/about.jsx';
import HomePage from '../Components/home.jsx';
import SignupPage from '../Components/signup/signup.jsx';

const App = (props) => {
  return(
    <div>
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/home" component={HomePage} />
        < Route path="/signup" component={SignupPage} />
      </Switch>
    </div>
  );
};

export default App;
