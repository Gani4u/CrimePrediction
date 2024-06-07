// AuthPage.js

import React from 'react';
import Signup from './Signup';
import Login from './Login';
import './AuthPage.css';

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Signup />
      </div>
      <div className="auth-container">
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;

