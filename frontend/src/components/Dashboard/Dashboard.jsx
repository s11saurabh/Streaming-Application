import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../../contexts/VideoContext';
import { FiVideo, FiClock, FiCheckCircle, FiAlertCircle, FiUploadCloud } from 'react-icons/fi';
import VideoCard from './VideoCard';
import Loader from '../Shared/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { videos, fetchVideos, loading } = useContext(VideoContext);
  const [stats, setStats] = useState({ total: 0, processing: 0, completed: 0, flagged: 0 });

  useEffect(() => {
    fetchVideos({ page: 1, limit: 6 });
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const newStats = {
        total: videos.length,
        processing: videos.filter(v => v.status === 'processing').length,
        completed: videos.filter(v => v.status === 'completed').length,
        flagged: videos.filter(v => v.sensitivityStatus === 'flagged').length
      };
      setStats(newStats);
    }
  }, [videos]);

  if (loading && videos.length === 0) {
    return <Loader size="large" text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your video content</p>
        </div>
        <button className="btn btn-primary btn-upload" onClick={() => navigate('/upload')}>
          <FiUploadCloud /> Upload Video
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <FiVideo />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.total}</h3>
            <p className="stat-label">Total Videos</p>
          </div>
          <div className="stat-gradient"></div>
        </div>

        <div className="stat-card stat-processing">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <FiClock />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.processing}</h3>
            <p className="stat-label">Processing</p>
          </div>
          <div className="stat-gradient"></div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <FiCheckCircle />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.completed}</h3>
            <p className="stat-label">Completed</p>
          </div>
          <div className="stat-gradient"></div>
        </div>

        <div className="stat-card stat-flagged">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <FiAlertCircle />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.flagged}</h3>
            <p className="stat-label">Flagged</p>
          </div>
          <div className="stat-gradient"></div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Videos</h2>
          <button className="btn btn-outline" onClick={() => navigate('/library')}>
            View All
          </button>
        </div>
        {videos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <FiUploadCloud className="empty-icon" />
            </div>
            <h3>No videos yet</h3>
            <p>Start by uploading your first video!</p>
            <button className="btn btn-primary" onClick={() => navigate('/upload')}>
              <FiUploadCloud /> Upload Video
            </button>
          </div>
        ) : (
          <div className="videos-grid">
            {videos.slice(0, 6).map(video => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;