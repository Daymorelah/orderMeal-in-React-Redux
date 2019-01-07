import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../Components/about.jsx';
import HomePage from '../Components/home.jsx';

const App = (props) => {
  console.log('children is ==> ', props.children);
  console.log('props is ==> ', props);
  return(
    <div>
      <h1>Header here</h1>
      <Switch>
        <Route exact strict path="/about" component={AboutPage} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
