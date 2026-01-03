import React, { useState } from 'react';
import { FiShield, FiEye, FiEdit, FiSettings } from 'react-icons/fi';
import './RoleManager.css';

const RoleManager = () => {
  const [roles] = useState([
    {
      id: 1,
      name: 'Viewer',
      icon: <FiEye />,
      permissions: ['View videos', 'Stream content', 'View own profile'],
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Editor',
      icon: <FiEdit />,
      permissions: ['All Viewer permissions', 'Upload videos', 'Edit own videos', 'Delete own videos'],
      color: '#f59e0b'
    },
    {
      id: 3,
      name: 'Admin',
      icon: <FiSettings />,
      permissions: ['All Editor permissions', 'Manage users', 'View all videos', 'System settings', 'Full access'],
      color: '#ec4899'
    }
  ]);

  return (
    <div className="role-manager">
      <div className="role-header">
        <FiShield className="header-icon" />
        <h2>Role Management</h2>
      </div>
      <p className="role-description">
        Define and manage user roles and their permissions across the platform.
      </p>

      <div className="roles-grid">
        {roles.map(role => (
          <div key={role.id} className="role-card" style={{ borderTopColor: role.color }}>
            <div className="role-card-header">
              <div className="role-icon" style={{ backgroundColor: role.color }}>
                {role.icon}
              </div>
              <h3>{role.name}</h3>
            </div>
            <div className="role-card-body">
              <h4>Permissions</h4>
              <ul className="permissions-list">
                {role.permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
                ))}
              </ul>
            </div>
            <div className="role-card-footer">
              <button className="btn btn-outline btn-sm">Edit Role</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManager;