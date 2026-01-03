

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiClock, FiCheckCircle, FiAlertCircle, FiPlay } from 'react-icons/fi';
// import { formatFileSize, formatDuration, formatDate } from '../../utils/helpers';
// import { getThumbnailUrl } from '../../services/videoService';
// import StatusIndicator from './StatusIndicator';
// import './VideoCard.css';

// const VideoCard = ({ video }) => {
//   const navigate = useNavigate();
//   const [imageError, setImageError] = useState(false);

//   const handleClick = () => {
//     navigate(`/video/${video._id}`);
//   };

//   const getStatusIcon = () => {
//     switch (video.status) {
//       case 'processing':
//         return <FiClock className="status-icon processing" />;
//       case 'completed':
//         return <FiCheckCircle className="status-icon completed" />;
//       case 'failed':
//         return <FiAlertCircle className="status-icon failed" />;
//       default:
//         return null;
//     }
//   };

//   const showThumbnail = video.thumbnailPath && !imageError;
//   const thumbnailUrl = showThumbnail ? getThumbnailUrl(video._id) : null;

//   console.log('VideoCard:', {
//     videoId: video._id,
//     hasThumbnailPath: !!video.thumbnailPath,
//     thumbnailPath: video.thumbnailPath,
//     thumbnailUrl: thumbnailUrl,
//     showThumbnail: showThumbnail
//   });

//   return (
//     <div className="video-card" onClick={handleClick}>
//       <div className="video-thumbnail">
//         {showThumbnail ? (
//           <img 
//             src={thumbnailUrl} 
//             alt={video.title}
//             onError={(e) => {
//               console.error('Thumbnail failed to load:', thumbnailUrl);
//               setImageError(true);
//             }}
//             onLoad={() => {
//               console.log('Thumbnail loaded successfully:', thumbnailUrl);
//             }}
//           />
//         ) : (
//           <div className="thumbnail-placeholder">
//             <FiPlay />
//           </div>
//         )}
        
//         {video.status === 'processing' && (
//           <div className="processing-overlay">
//             <div className="processing-bar">
//               <div className="processing-progress" style={{ width: `${video.processingProgress}%` }}></div>
//             </div>
//             <span>{video.processingProgress}%</span>
//           </div>
//         )}
//         {video.duration > 0 && (
//           <div className="video-duration">{formatDuration(video.duration)}</div>
//         )}
//       </div>

//       <div className="video-info">
//         <div className="video-header">
//           <h3 className="video-title">{video.title}</h3>
//           {getStatusIcon()}
//         </div>

//         {video.description && (
//           <p className="video-description">{video.description.substring(0, 80)}{video.description.length > 80 ? '...' : ''}</p>
//         )}

//         <div className="video-meta">
//           <span className="video-size">{formatFileSize(video.size)}</span>
//           <span className="video-date">{formatDate(video.createdAt)}</span>
//         </div>

//         <div className="video-footer">
//           <StatusIndicator status={video.status} sensitivityStatus={video.sensitivityStatus} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;










import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiAlertCircle, FiPlay } from 'react-icons/fi';
import { formatFileSize, formatDuration, formatDate } from '../../utils/helpers';
import StatusIndicator from './StatusIndicator';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  const getStatusIcon = () => {
    switch (video.status) {
      case 'processing':
        return <FiClock className="status-icon processing" />;
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'failed':
        return <FiAlertCircle className="status-icon failed" />;
      default:
        return null;
    }
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <div className="video-thumbnail">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="thumbnail-placeholder">
            <FiPlay />
          </div>
        )}
        
        {video.status === 'processing' && (
          <div className="processing-overlay">
            <div className="processing-bar">
              <div className="processing-progress" style={{ width: `${video.processingProgress}%` }}></div>
            </div>
            <span>{video.processingProgress}%</span>
          </div>
        )}
        {video.duration > 0 && (
          <div className="video-duration">{formatDuration(video.duration)}</div>
        )}
      </div>

      <div className="video-info">
        <div className="video-header">
          <h3 className="video-title">{video.title}</h3>
          {getStatusIcon()}
        </div>

        {video.description && (
          <p className="video-description">{video.description.substring(0, 80)}{video.description.length > 80 ? '...' : ''}</p>
        )}

        <div className="video-meta">
          <span className="video-size">{formatFileSize(video.size)}</span>
          <span className="video-date">{formatDate(video.createdAt)}</span>
        </div>

        <div className="video-footer">
          <StatusIndicator status={video.status} sensitivityStatus={video.sensitivityStatus} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;






