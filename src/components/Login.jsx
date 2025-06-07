import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Particles from './Particles';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

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
      setError('Password must be at least 6 characters');
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
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    console.log('Google Sign In clicked');
  };

  return (
    <div className="auth-container">
      <Particles
        particleCount={500}
        particleSpread={20}
        speed={0.15}
        particleColors={['#2196f3', '#64b5f6', '#1976d2', '#90caf9']}
        moveParticlesOnHover={true}
        particleHoverFactor={3}
        alphaParticles={true}
        particleBaseSize={120}
        sizeRandomness={0.8}
        cameraDistance={15}
        className="particles-background"
      />
      <div className="auth-box">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-icon-group">
            <input
              type="email"
              name="email"
              className={`auth-input ${touched.email && !formData.email ? 'error' : ''}`}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FiMail className="input-icon" />
          </div>

          <div className="input-icon-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`auth-input ${touched.password && !formData.password ? 'error' : ''}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FiLock className="input-icon" />
            <button
              type="button"
              className="input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <FiAlertCircle className="error-icon" />
              {error}
            </div>
          )}

          <div className="auth-options">
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider">or continue with</div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="google-icon" />
          Sign in with Google
        </button>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 