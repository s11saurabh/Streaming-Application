import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import './Notification.css';

const Notification = ({ type = 'info', message, onClose }) => {
  const icons = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    warning: <FiAlertCircle />,
    info: <FiInfo />
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {icons[type]}
      </div>
      <div className="notification-message">
        {message}
      </div>
      {onClose && (
        <button className="notification-close" onClick={onClose}>
          <FiX />
        </button>
      )}
    </div>
  );
};

export default Notification;