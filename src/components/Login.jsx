import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

  // Mouse movement effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
  const translateX = useTransform(springX, [-1, 1], [-20, 20]);
  const translateY = useTransform(springY, [-1, 1], [-20, 20]);

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
        particleCount={150}
        particleSpread={12}
        speed={0.1}
        particleColors={['#ffffff', '#ffffff']}
        moveParticlesOnHover={true}
        alphaParticles={true}
        particleBaseSize={120}
        disableRotation={false}
        className="particles-background"
      />
      <motion.div 
        className="auth-box"
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="auth-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p 
          className="auth-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Sign in to continue to your account
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.div 
            className="input-icon-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>

          <motion.div 
            className="input-icon-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
            <motion.button
              type="button"
              className="input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </motion.button>
          </motion.div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiAlertCircle className="error-icon" />
              {error}
            </motion.div>
          )}

          <motion.div 
            className="auth-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </motion.div>

          <motion.button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <motion.div 
          className="divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          or continue with
        </motion.div>

        <motion.button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <FcGoogle className="google-icon" />
          Sign in with Google
        </motion.button>

        <motion.div 
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Don't have an account?{' '}
          <Link to="/signup">Create an account</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 