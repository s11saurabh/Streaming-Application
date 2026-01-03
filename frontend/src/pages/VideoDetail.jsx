// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { VideoContext } from '../contexts/VideoContext';
// import Navbar from '../components/Shared/Navbar';
// import Sidebar from '../components/Shared/Sidebar';
// import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
// import StatusIndicator from '../components/Dashboard/StatusIndicator';
// import Loader from '../components/Shared/Loader';
// import Modal from '../components/Shared/Modal';
// import { FiEdit2, FiTrash2, FiClock, FiDatabase, FiUser, FiCalendar } from 'react-icons/fi';
// import { formatFileSize, formatDuration, formatDate } from '../utils/helpers';
// import { toast } from 'react-toastify';
// import './VideoDetail.css';

// const VideoDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { fetchVideoById, updateVideo, deleteVideo, loading } = useContext(VideoContext);
//   const [video, setVideo] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({ title: '', description: '' });

//   useEffect(() => {
//     loadVideo();
//   }, [id]);

//   const loadVideo = async () => {
//     try {
//       const videoData = await fetchVideoById(id);
//       setVideo(videoData);
//       setEditFormData({
//         title: videoData.title,
//         description: videoData.description || ''
//       });
//     } catch (error) {
//       toast.error('Failed to load video');
//       navigate('/library');
//     }
//   };

//   const handleEdit = () => {
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateVideo(id, editFormData);
//       setIsEditModalOpen(false);
//       loadVideo();
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this video?')) {
//       try {
//         await deleteVideo(id);
//         navigate('/library');
//       } catch (error) {
//         console.error('Delete error:', error);
//       }
//     }
//   };

//   if (loading || !video) {
//     return (
//       <div className="video-detail-layout">
//         <Navbar />
//         <div className="video-detail-main">
//           <Sidebar />
//           <main className="video-detail-content">
//             <Loader size="large" text="Loading video..." />
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="video-detail-layout">
//       <Navbar />
//       <div className="video-detail-main">
//         <Sidebar />
//         <main className="video-detail-content">
//           <div className="video-detail-container">
//             <div className="video-player-section">
//               {video.status === 'completed' ? (
//                 <VideoPlayer videoId={video._id} />
//               ) : (
//                 <div className="video-placeholder">
//                   <div className="placeholder-content">
//                     <FiClock className="placeholder-icon" />
//                     <h3>Video Processing</h3>
//                     <p>Your video is being processed. Please check back later.</p>
//                     {video.processingProgress > 0 && (
//                       <div className="processing-status">
//                         <div className="progress-bar">
//                           <div className="progress-fill" style={{ width: `${video.processingProgress}%` }}></div>
//                         </div>
//                         <span>{video.processingProgress}%</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="video-info-section">
//               <div className="video-header">
//                 <div className="video-title-area">
//                   <h1>{video.title}</h1>
//                   <StatusIndicator status={video.status} sensitivityStatus={video.sensitivityStatus} />
//                 </div>
//                 <div className="video-actions">
//                   <button className="btn btn-secondary" onClick={handleEdit}>
//                     <FiEdit2 /> Edit
//                   </button>
//                   <button className="btn btn-outline btn-danger" onClick={handleDelete}>
//                     <FiTrash2 /> Delete
//                   </button>
//                 </div>
//               </div>

//               {video.description && (
//                 <div className="video-description">
//                   <h3>Description</h3>
//                   <p>{video.description}</p>
//                 </div>
//               )}

//               <div className="video-metadata">
//                 <h3>Video Details</h3>
//                 <div className="metadata-grid">
//                   <div className="metadata-item">
//                     <FiUser className="metadata-icon" />
//                     <div>
//                       <span className="metadata-label">Uploaded By</span>
//                       <span className="metadata-value">{video.uploadedBy?.name || 'Unknown'}</span>
//                     </div>
//                   </div>
//                   <div className="metadata-item">
//                     <FiCalendar className="metadata-icon" />
//                     <div>
//                       <span className="metadata-label">Upload Date</span>
//                       <span className="metadata-value">{formatDate(video.createdAt)}</span>
//                     </div>
//                   </div>
//                   <div className="metadata-item">
//                     <FiDatabase className="metadata-icon" />
//                     <div>
//                       <span className="metadata-label">File Size</span>
//                       <span className="metadata-value">{formatFileSize(video.size)}</span>
//                     </div>
//                   </div>
//                   <div className="metadata-item">
//                     <FiClock className="metadata-icon" />
//                     <div>
//                       <span className="metadata-label">Duration</span>
//                       <span className="metadata-value">{formatDuration(video.duration)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Video">
//         <form onSubmit={handleEditSubmit}>
//           <div className="input-group">
//             <label htmlFor="edit-title">Title</label>
//             <input
//               type="text"
//               id="edit-title"
//               value={editFormData.title}
//               onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="edit-description">Description</label>
//             <textarea
//               id="edit-description"
//               value={editFormData.description}
//               onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//               rows="4"
//             />
//           </div>
//           <div className="modal-actions">
//             <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary">
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default VideoDetail;





import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import StatusIndicator from '../components/Dashboard/StatusIndicator';
import Loader from '../components/Shared/Loader';
import Modal from '../components/Shared/Modal';
import { FiEdit2, FiTrash2, FiClock, FiDatabase, FiUser, FiCalendar, FiSearch } from 'react-icons/fi';
import { formatFileSize, formatDuration, formatDate } from '../utils/helpers';
import api from '../services/api';
import { toast } from 'react-toastify';
import './VideoDetail.css';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVideoById, updateVideo, deleteVideo, loading } = useContext(VideoContext);
  const [video, setVideo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editFormData, setEditFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    loadVideo();
  }, [id]);

  const loadVideo = async () => {
    try {
      const videoData = await fetchVideoById(id);
      setVideo(videoData);
      setEditFormData({
        title: videoData.title,
        description: videoData.description || ''
      });
    } catch (error) {
      toast.error('Failed to load video');
      navigate('/library');
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await api.post(`/videos/${id}/analyze`);
      toast.success('Video analysis started');
      setTimeout(() => {
        loadVideo();
      }, 2000);
    } catch (error) {
      toast.error('Failed to start analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVideo(id, editFormData);
      setIsEditModalOpen(false);
      loadVideo();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(id);
        navigate('/library');
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (loading || !video) {
    return (
      <div className="video-detail-layout">
        <Navbar />
        <div className="video-detail-main">
          <Sidebar />
          <main className="video-detail-content">
            <Loader size="large" text="Loading video..." />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="video-detail-layout">
      <Navbar />
      <div className="video-detail-main">
        <Sidebar />
        <main className="video-detail-content">
          <div className="video-detail-container">
            <div className="video-player-section">
              {video.status === 'completed' ? (
                <VideoPlayer videoId={video._id} />
              ) : (
                <div className="video-placeholder">
                  <div className="placeholder-content">
                    <FiClock className="placeholder-icon" />
                    <h3>Video Processing</h3>
                    <p>Your video is being processed. Please check back later.</p>
                    {video.processingProgress > 0 && (
                      <div className="processing-status">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${video.processingProgress}%` }}></div>
                        </div>
                        <span>{video.processingProgress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="video-info-section">
              <div className="video-header">
                <div className="video-title-area">
                  <h1>{video.title}</h1>
                  <StatusIndicator status={video.status} sensitivityStatus={video.sensitivityStatus} />
                </div>
                <div className="video-actions">
                  {video.sensitivityStatus === 'pending' && (
                    <button 
                      className="btn btn-primary" 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      <FiSearch /> {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
                    </button>
                  )}
                  <button className="btn btn-secondary" onClick={handleEdit}>
                    <FiEdit2 /> Edit
                  </button>
                  <button className="btn btn-outline btn-danger" onClick={handleDelete}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              {video.description && (
                <div className="video-description">
                  <h3>Description</h3>
                  <p>{video.description}</p>
                </div>
              )}

              <div className="video-metadata">
                <h3>Video Details</h3>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <FiUser className="metadata-icon" />
                    <div>
                      <span className="metadata-label">Uploaded By</span>
                      <span className="metadata-value">{video.uploadedBy?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  <div className="metadata-item">
                    <FiCalendar className="metadata-icon" />
                    <div>
                      <span className="metadata-label">Upload Date</span>
                      <span className="metadata-value">{formatDate(video.createdAt)}</span>
                    </div>
                  </div>
                  <div className="metadata-item">
                    <FiDatabase className="metadata-icon" />
                    <div>
                      <span className="metadata-label">File Size</span>
                      <span className="metadata-value">{formatFileSize(video.size)}</span>
                    </div>
                  </div>
                  <div className="metadata-item">
                    <FiClock className="metadata-icon" />
                    <div>
                      <span className="metadata-label">Duration</span>
                      <span className="metadata-value">{formatDuration(video.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Video">
        <form onSubmit={handleEditSubmit}>
          <div className="input-group">
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              id="edit-title"
              value={editFormData.title}
              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              rows="4"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VideoDetail;