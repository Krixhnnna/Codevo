import React from 'react';
import { Trophy, ListTodo, CalendarCheck, UserCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Codevo</span>
        </div>
        
        <div className="nav-links">
          <a href="#leaderboard" className="nav-link">
            <Trophy className="nav-icon" />
            Leaderboard
          </a>
          <a href="#question-tracker" className="nav-link">
            <ListTodo className="nav-icon" />
            Question Tracker
          </a>
          <a href="#event-tracker" className="nav-link">
            <CalendarCheck className="nav-icon" />
            Event Tracker
          </a>
          <a href="#profile-tracker" className="nav-link">
            <UserCircle className="nav-icon" />
            Profile Tracker
          </a>
        </div>
        
        <div className="nav-actions">
          <button className="login-btn" onClick={handleLoginClick}>
            Login <LogIn className="login-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 