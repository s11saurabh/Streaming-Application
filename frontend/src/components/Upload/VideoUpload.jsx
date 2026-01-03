import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import DragDropZone from './DragDropZone';
import UploadProgress from './UploadProgress';
import useVideoUpload from '../../hooks/useVideoUpload';
import { validateVideoFile, validateRequired } from '../../utils/validators';
import { toast } from 'react-toastify';
import './VideoUpload.css';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});
  const { handleUpload, uploadProgress, uploading, resetUpload } = useVideoUpload();
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    setSelectedFile(file);
    setErrors({});
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    resetUpload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const titleValidation = validateRequired(formData.title, 'Title');
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.error;
    }

    if (!selectedFile) {
      newErrors.file = 'Please select a video file';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = new FormData();
    data.append('video', selectedFile);
    data.append('title', formData.title);
    data.append('description', formData.description);

    try {
      await handleUpload(data);
      toast.success('Video uploaded successfully!');
      setTimeout(() => {
        navigate('/library');
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>Upload Video</h1>
        <p>Share your content with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        {!selectedFile ? (
          <DragDropZone onFileSelect={handleFileSelect} />
        ) : (
          <div className="file-preview">
            <div className="file-info">
              <FiUpload className="file-icon" />
              <div className="file-details">
                <h4>{selectedFile.name}</h4>
                <p>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            {!uploading && (
              <button type="button" className="remove-file" onClick={handleRemoveFile}>
                <FiX />
              </button>
            )}
          </div>
        )}

        {errors.file && <span className="error-message">{errors.file}</span>}

        <div className="input-group">
          <label htmlFor="title">Video Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            disabled={uploading}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter video description (optional)"
            rows="4"
            disabled={uploading}
          />
        </div>

        {uploading && <UploadProgress progress={uploadProgress} />}

        <div className="upload-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/library')} disabled={uploading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={uploading || !selectedFile}>
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;