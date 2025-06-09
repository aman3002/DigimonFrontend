// src/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './LoginPage.css';
import policeLogo from '../policeLogo.png';

const LoginPage = () => {
  const navigate = useNavigate(); // ✅ Initialize the hook

  const handleSignIn = () => {
    navigate('/home'); // ✅ Navigate to homepage on click
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={policeLogo} alt="Police Logo" className="police-logo" />
      </div>

      <div className="title-banner">Social Media Patrol Tool</div>

      <div className="login-box">
        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button onClick={handleSignIn}>Sign In</button> {/* ✅ Add onClick */}
      </div>
    </div>
  );
};

export default LoginPage;
