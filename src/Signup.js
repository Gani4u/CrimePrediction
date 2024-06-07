import React, { useState } from 'react';
import './Signup.css';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    // Store the new user in localStorage or database
    console.log('User signed up successfully:', newUser);
    // Redirect to login page after successful signup
    history.push('/login');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <br/> <button onClick={() => history.push('/login')}>Login</button></p>
    </div>
  );
};

export default Signup;

