import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      // Mock authentication (replace with real API call)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      // Mock Google Sign-In (replace with real Google OAuth implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box enhanced-auth-box">
        <div className="auth-logo">Codevo</div>
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Sign in to continue your coding journey</p>
        
        <button 
          onClick={handleGoogleSignIn}
          className="google-auth-button"
          disabled={googleLoading}
        >
          <FcGoogle className="google-icon" />
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon-group">
              <span className="input-icon"><FiMail /></span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email address"
                required
                autoComplete="username"
                className={touched.email && !formData.email ? 'input-error' : ''}
              />
            </div>
            {touched.email && !formData.email && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                Email is required
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="input-icon-group">
              <span className="input-icon"><FiLock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                required
                autoComplete="current-password"
                className={touched.password && !formData.password ? 'input-error' : ''}
              />
              <span 
                className="input-icon input-icon-right" 
                onClick={() => setShowPassword(v => !v)} 
                tabIndex={0} 
                role="button" 
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {touched.password && !formData.password && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                Password is required
              </div>
            )}
          </div>

          {error && (
            <div className="auth-error">
              <FiAlertCircle className="error-icon" />
              {error}
            </div>
          )}

          <div className="auth-options">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 