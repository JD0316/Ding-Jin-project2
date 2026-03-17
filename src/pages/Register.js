import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Reusing the same CSS as the Login page

function Register() {
  return (
    <div className="form-container">
      <form className="login-form">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="verify-password">Verify Password</label>
          <input type="password" id="verify-password" name="verify-password" required />
        </div>
        <button type="submit">Register</button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
}

export default Register;