import React from 'react';
import './StatusIndicator.css';

const StatusIndicator = ({ status, sensitivityStatus }) => {
  const getStatusLabel = () => {
    if (status === 'completed') {
      return sensitivityStatus === 'safe' ? 'Safe' : sensitivityStatus === 'flagged' ? 'Flagged' : 'Pending Analysis';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = () => {
    if (status === 'completed') {
      return sensitivityStatus === 'safe' ? 'safe' : sensitivityStatus === 'flagged' ? 'flagged' : 'pending';
    }
    return status;
  };

  return (
    <span className={`status-badge status-${getStatusClass()}`}>
      {getStatusLabel()}
    </span>
  );
};

export default StatusIndicator;