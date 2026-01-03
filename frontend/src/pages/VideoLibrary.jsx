import React, { useEffect, useState, useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import VideoCard from '../components/Dashboard/VideoCard';
import FilterPanel from '../components/Dashboard/FilterPanel';
import Loader from '../components/Shared/Loader';
import { FiVideo } from 'react-icons/fi';
import './VideoLibrary.css';

const VideoLibrary = () => {
  const { videos, fetchVideos, loading, pagination } = useContext(VideoContext);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos({ page: currentPage, limit: 12, ...filters });
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="library-layout">
      <Navbar />
      <div className="library-main">
        <Sidebar />
        <main className="library-content">
          <div className="library-container">
            <div className="library-header">
              <h1>Video Library</h1>
              <p>Manage and browse your video collection</p>
            </div>

            <div className="library-body">
              <aside className="library-filters">
                <FilterPanel onFilterChange={handleFilterChange} />
              </aside>

              <div className="library-videos">
                {loading && videos.length === 0 ? (
                  <Loader size="large" text="Loading videos..." />
                ) : videos.length === 0 ? (
                  <div className="empty-library">
                    <FiVideo className="empty-icon" />
                    <h3>No videos found</h3>
                    <p>Try adjusting your filters or upload your first video</p>
                  </div>
                ) : (
                  <>
                    <div className="videos-grid">
                      {videos.map(video => (
                        <VideoCard key={video._id} video={video} />
                      ))}
                    </div>

                    {pagination.pages > 1 && (
                      <div className="pagination">
                        <button
                          className="pagination-btn"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <div className="pagination-info">
                          Page {currentPage} of {pagination.pages}
                        </div>
                        <button
                          className="pagination-btn"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === pagination.pages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VideoLibrary;