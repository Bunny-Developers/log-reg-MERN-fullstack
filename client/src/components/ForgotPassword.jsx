import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onChange = e => setEmail(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ email });
      const res = await axios.post('http://localhost:5000/api/auth/forgotpassword', body, config);
      
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="form-container">
      <h1>Reset Password</h1>
      <p>Enter your email address and we'll send you a link to reset your password.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <input type="submit" value="Send Reset Link" className="btn btn-primary" />
      </form>
      <p>
        Remember your password? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;