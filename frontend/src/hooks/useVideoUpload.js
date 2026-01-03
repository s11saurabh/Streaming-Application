import { useState, useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';

const useVideoUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { uploadVideo } = useContext(VideoContext);

  const handleUpload = async (formData) => {
    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      const onProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      };

      const video = await uploadVideo(formData, onProgress);
      setUploading(false);
      setUploadProgress(100);
      return video;
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Upload failed');
      setUploading(false);
      throw error;
    }
  };

  const resetUpload = () => {
    setUploadProgress(0);
    setUploading(false);
    setUploadError(null);
  };

  return {
    uploadProgress,
    uploading,
    uploadError,
    handleUpload,
    resetUpload
  };
};

export default useVideoUpload;