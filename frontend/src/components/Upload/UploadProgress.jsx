import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './UploadProgress.css';

const UploadProgress = ({ progress }) => {
  const isComplete = progress === 100;

  return (
    <div className="upload-progress">
      <div className="progress-header">
        <span className="progress-label">
          {isComplete ? 'Upload Complete' : 'Uploading...'}
        </span>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        >
          {isComplete && <FiCheckCircle className="complete-icon" />}
        </div>
      </div>
      <p className="progress-info">
        {isComplete 
          ? 'Your video is being processed. You will be notified when it\'s ready.' 
          : 'Please wait while your video is being uploaded...'}
      </p>
    </div>
  );
};

export default UploadProgress;