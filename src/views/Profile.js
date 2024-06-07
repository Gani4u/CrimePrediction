// src/views/profile.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // State to store user data
  const [userData, setUserData] = React.useState(null);

React.useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    setUserData(JSON.parse(storedUserData));
  }
}, []);

  // Function to fetch user data
  const fetchUserData = () => {
    // Send a request to your API to fetch user data
    // using the user.sub (unique user identifier)
    // and update the userData state
    
  // Store user data in local storage
  localStorage.setItem('userData', JSON.stringify(userData));
};
  };

  // Function to handle sign-up
  const handleSignUp = () => {
    // Implement your sign-up logic here
    // After successful sign-up, fetch user data
    fetchUserData();
  };

  // Function to handle logout
  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={loginWithRedirect}>Log In</button>
      )}
      {isAuthenticated && (
        <div>
          <button onClick={handleLogout}>Log Out</button>
          {userData ? (
            <div>
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      )}
      {isAuthenticated && userData && (
        <button onClick={handleSignUp}>Sign Up</button>
      )}
    </div>
  );
};

export default Profile;
