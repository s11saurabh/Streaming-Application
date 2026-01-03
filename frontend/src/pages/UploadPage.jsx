import React from 'react';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import VideoUpload from '../components/Upload/VideoUpload';
import './UploadPage.css';

const UploadPage = () => {
  return (
    <div className="upload-layout">
      <Navbar />
      <div className="upload-main">
        <Sidebar />
        <main className="upload-content">
          <VideoUpload />
        </main>
      </div>
    </div>
  );
};

export default UploadPage;