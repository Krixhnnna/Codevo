import React from 'react';
import { Link } from 'react-router-dom';
import BlurText from './BlurText';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
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
        
        <div className="hero-buttons">
          <Link to="/login" className="btn-wrapper">
            Login
          </Link>
          <Link to="/signup" className="btn-wrapper btn-blue">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 