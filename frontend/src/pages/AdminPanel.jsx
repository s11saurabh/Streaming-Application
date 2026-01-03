import React, { useState } from 'react';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import UserManagement from '../components/Admin/UserManagement';
import RoleManager from '../components/Admin/RoleManager';
import SystemSettings from '../components/Admin/SystemSettings';
import { FiUsers, FiShield, FiSettings } from 'react-icons/fi';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', icon: <FiUsers /> },
    { id: 'roles', label: 'Roles', icon: <FiShield /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManager />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <main className="admin-content">
          <div className="admin-container">
            <div className="admin-header">
              <h1>Admin Panel</h1>
              <p>Manage users, roles, and system settings</p>
            </div>

            <div className="admin-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="admin-body">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;