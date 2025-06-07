import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlurText from './BlurText';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
          rotateX: mousePosition.y * 5,
          rotateY: mousePosition.x * 5
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <BlurText
          text="Track. Improve. Dominate."
          delay={150}
          animateBy="words"
          direction="top"
          className="hero-title"
        />
        
        <BlurText
          text="Codevo is Your All in One Coding Platform"
          delay={100}
          animateBy="words"
          direction="top"
          className="hero-subtitle"
        />
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/login" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
            <motion.div
              className="btn-wrapper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.div>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
            <motion.div
              className="btn-wrapper btn-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 