import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();
  const { resettoken } = useParams();

  const { password, password2 } = formData;

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/resetpassword/${resettoken}`);
        setValidToken(true);
      } catch (err) {
        setError('Invalid or expired reset token');
        setValidToken(false);
      }
    };

    checkTokenValidity();
  }, [resettoken]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ password });
      const res = await axios.put(`http://localhost:5000/api/auth/resetpassword/${resettoken}`, body, config);
      
      setSuccess('Password reset successfully');
      setError('');
      
      // Store token and redirect to dashboard after a short delay
      localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  if (!validToken && error) {
    return (
      <div className="form-container">
        <h1>Reset Password</h1>
        <div className="error-message">{error}</div>
        <p>
          <a href="/forgotpassword">Request a new reset link</a>
        </p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Reset Your Password</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input type="submit" value="Reset Password" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default ResetPassword;