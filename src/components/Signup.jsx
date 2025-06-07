import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Particles from './Particles';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!formData.name) {
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
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
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
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us and start your coding journey</p>

        <form onSubmit={handleSubmit}>
          <div className="input-icon-group">
            <input
              type="text"
              name="name"
              className={`auth-input ${touched.name && !formData.name ? 'error' : ''}`}
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FiUser className="input-icon" />
          </div>

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

          <div className="input-icon-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`auth-input ${touched.confirmPassword && !formData.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FiLock className="input-icon" />
            <button
              type="button"
              className="input-icon-right"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <FiAlertCircle className="error-icon" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="divider">or continue with</div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="google-icon" />
          Sign up with Google
        </button>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 