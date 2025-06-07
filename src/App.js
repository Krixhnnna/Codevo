import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Particles from './components/Particles';
import ClickSpark from './components/ClickSpark';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400} />
      <div className="App">
        <div className="particles-background">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={150}
            particleSpread={12}
            speed={0.1}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 