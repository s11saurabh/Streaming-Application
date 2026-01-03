import React, { useState } from 'react';
import { FiSave, FiServer, FiDatabase, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    maxFileSize: 500,
    allowedFormats: 'mp4, avi, mkv, mov',
    enableNotifications: true,
    autoProcessing: true,
    storageProvider: 'local',
    emailNotifications: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="system-settings">
      <h2>System Settings</h2>
      <p className="settings-description">Configure global system settings and preferences</p>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <div className="section-header">
            <FiServer />
            <h3>Upload Settings</h3>
          </div>
          <div className="settings-grid">
            <div className="input-group">
              <label htmlFor="maxFileSize">Max File Size (MB)</label>
              <input
                type="number"
                id="maxFileSize"
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleChange}
                min="1"
                max="5000"
              />
            </div>
            <div className="input-group">
              <label htmlFor="allowedFormats">Allowed Formats</label>
              <input
                type="text"
                id="allowedFormats"
                name="allowedFormats"
                value={settings.allowedFormats}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <FiDatabase />
            <h3>Processing Settings</h3>
          </div>
          <div className="settings-grid">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="autoProcessing"
                name="autoProcessing"
                checked={settings.autoProcessing}
                onChange={handleChange}
              />
              <label htmlFor="autoProcessing">Enable Auto Processing</label>
            </div>
            <div className="input-group">
              <label htmlFor="storageProvider">Storage Provider</label>
              <select
                id="storageProvider"
                name="storageProvider"
                value={settings.storageProvider}
                onChange={handleChange}
              >
                <option value="local">Local Storage</option>
                <option value="aws">AWS S3</option>
                <option value="gcp">Google Cloud Storage</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <FiMail />
            <h3>Notification Settings</h3>
          </div>
          <div className="settings-grid">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="enableNotifications"
                name="enableNotifications"
                checked={settings.enableNotifications}
                onChange={handleChange}
              />
              <label htmlFor="enableNotifications">Enable Real-time Notifications</label>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <label htmlFor="emailNotifications">Enable Email Notifications</label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="btn btn-primary">
            <FiSave /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;