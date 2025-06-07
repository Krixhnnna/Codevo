import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCode, FiBook, FiLogIn } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Codevo</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <FiHome className="nav-icon" />
            Home
          </Link>
          <Link to="/problems" className={`nav-link ${isActive('/problems') ? 'active' : ''}`}>
            <FiCode className="nav-icon" />
            Problems
          </Link>
          <Link to="/learn" className={`nav-link ${isActive('/learn') ? 'active' : ''}`}>
            <FiBook className="nav-icon" />
            Learn
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="login-btn">
            <FiLogIn className="login-icon" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 