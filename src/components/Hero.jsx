import React from 'react';
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
          <a href="#question-tracker" className="btn-wrapper">
            Question Tracker
          </a>
          <a href="#profile-tracker" className="btn-wrapper btn-blue">
            Profile Tracker
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 