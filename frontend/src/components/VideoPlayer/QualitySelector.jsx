import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import './QualitySelector.css';

const QualitySelector = ({ qualities = ['Auto', '1080p', '720p', '480p', '360p'], onQualityChange }) => {
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [isOpen, setIsOpen] = useState(false);

  const handleQualitySelect = (quality) => {
    setSelectedQuality(quality);
    onQualityChange(quality);
    setIsOpen(false);
  };

  return (
    <div className="quality-selector">
      <button className="quality-btn" onClick={() => setIsOpen(!isOpen)}>
        <FiSettings />
        <span>{selectedQuality}</span>
      </button>
      {isOpen && (
        <div className="quality-menu">
          {qualities.map(quality => (
            <button
              key={quality}
              className={`quality-option ${selectedQuality === quality ? 'active' : ''}`}
              onClick={() => handleQualitySelect(quality)}
            >
              {quality}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QualitySelector;