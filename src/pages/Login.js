import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="form-container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
}

export default Login;