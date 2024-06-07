import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Import Switch and Route
import Signup from './Signup';
import Login from './Login';
import CrimeMap from './CrimeMap';
import Prediction from './Prediction';
import ImageGallery from './ImageGallery';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map" component={CrimeMap} />
        <Route path="/prediction" component={Prediction} />
        <Route path="/imagegallery" component={ImageGallery} />
        <Route exact path="/signup" component={Signup} /> 
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;

