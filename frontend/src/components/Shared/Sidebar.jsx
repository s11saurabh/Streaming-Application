import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiVideo, FiUpload, FiSettings, FiUsers } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: <FiGrid />, label: 'Dashboard', roles: ['viewer', 'editor', 'admin'] },
    { path: '/library', icon: <FiVideo />, label: 'Video Library', roles: ['viewer', 'editor', 'admin'] },
    { path: '/upload', icon: <FiUpload />, label: 'Upload', roles: ['editor', 'admin'] },
    { path: '/admin', icon: <FiSettings />, label: 'Admin Panel', roles: ['admin'] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {filteredItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;