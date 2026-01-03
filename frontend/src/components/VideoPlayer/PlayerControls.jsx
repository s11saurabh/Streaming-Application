import React, { useState } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { formatTime } from '../../utils/formatters';
import './PlayerControls.css';

const PlayerControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onSkip
}) => {
  const [showControls, setShowControls] = useState(true);

  const handleSeekChange = (e) => {
    const time = parseFloat(e.target.value);
    onSeek(time);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    onVolumeChange(vol);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`player-controls ${showControls ? 'visible' : ''}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="progress-container">
        <input
          type="range"
          className="progress-slider"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekChange}
          step="0.1"
        />
        <div className="progress-bar">
          <div className="progress-filled" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="controls-bottom">
        <div className="controls-left">
          <button className="control-btn" onClick={onPlayPause}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button className="control-btn" onClick={() => onSkip(-10)}>
            <FiSkipBack />
          </button>
          <button className="control-btn" onClick={() => onSkip(10)}>
            <FiSkipForward />
          </button>
          <div className="volume-control">
            <button className="control-btn" onClick={onToggleMute}>
              {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </div>
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="controls-right">
          <button className="control-btn" onClick={onToggleFullscreen}>
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;