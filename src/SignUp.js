import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!/^[A-Z].*_/.test(username)) {
      setError('Username must start with a capital letter and contain an underscore.');
      return;
    }

    try {
      // Add new user to db.json
      await axios.post('http://localhost:8000/users', {
        username,
        password
      });
      setError('');
      navigate('/login'); // Redirect to login after successful sign-up
    } catch (err) {
      setError('Error occurred while signing up. Please try again.');
    }
  };

  return (
    <center>
    <div className="signup-container">

      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            <br/>
            <br/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <br/>
          

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
    </center>
  );
}

export default SignUp;
