// NavigationToolbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it for routing

const NavigationToolbar = () => {
  return (
    <div className="navigation-toolbar">
      <Link to="/login" className="navigation-button">EXIT</Link>
      <Link to="/prediction" className="navigation-button">Prediction Model</Link>
      <Link to="/about" className="navigation-button">ABOUT</Link>
    </div>
  );
};

export default NavigationToolbar;

