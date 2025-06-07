import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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
      // Mock signup (replace with real API call)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigate('/login');
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
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box enhanced-auth-box">
        <div className="auth-logo">Codevo</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join our coding community today</p>
        
        <button 
          onClick={handleGoogleSignIn}
          className="google-auth-button"
          disabled={googleLoading}
        >
          <FcGoogle className="google-icon" />
          {googleLoading ? 'Signing up...' : 'Continue with Google'}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon-group">
              <span className="input-icon"><FiUser /></span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full Name"
                required
                className={touched.name && !formData.name ? 'input-error' : ''}
              />
            </div>
            {touched.name && !formData.name && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                Name is required
              </div>
            )}
          </div>

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
                autoComplete="new-password"
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

          <div className="form-group">
            <div className="input-icon-group">
              <span className="input-icon"><FiLock /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                className={touched.confirmPassword && !formData.confirmPassword ? 'input-error' : ''}
              />
              <span 
                className="input-icon input-icon-right" 
                onClick={() => setShowConfirmPassword(v => !v)} 
                tabIndex={0} 
                role="button" 
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {touched.confirmPassword && !formData.confirmPassword && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                Please confirm your password
              </div>
            )}
          </div>

          {error && (
            <div className="auth-error">
              <FiAlertCircle className="error-icon" />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 