import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiLogOut, FiMenu, FiX, FiVideo, FiUpload, FiGrid, FiSettings } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FiVideo className="logo-icon" />
          <span>VideoStream</span>
        </Link>

        {isAuthenticated && (
          <>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
              <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard')}`} onClick={() => setIsOpen(false)}>
                <FiGrid /> Dashboard
              </Link>
              <Link to="/library" className={`navbar-link ${isActive('/library')}`} onClick={() => setIsOpen(false)}>
                <FiVideo /> Library
              </Link>
              <Link to="/upload" className={`navbar-link ${isActive('/upload')}`} onClick={() => setIsOpen(false)}>
                <FiUpload /> Upload
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={`navbar-link ${isActive('/admin')}`} onClick={() => setIsOpen(false)}>
                  <FiSettings /> Admin
                </Link>
              )}
            </div>

            <div className="navbar-actions">
              <div className="navbar-user">
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span>{user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <button onClick={handleLogout} className="navbar-logout">
                <FiLogOut /> Logout
              </button>
            </div>

            <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </>
        )}

        {!isAuthenticated && (
          <div className="navbar-auth">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;