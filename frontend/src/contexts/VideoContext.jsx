import React, { createContext, useState, useCallback } from 'react';
import { getVideos, getVideoById, uploadVideo as uploadVideoService, updateVideo as updateVideoService, deleteVideo as deleteVideoService } from '../services/videoService';
import { toast } from 'react-toastify';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });

  const fetchVideos = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await getVideos(params);
      setVideos(response.data);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (error) {
      toast.error('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVideoById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await getVideoById(id);
      setCurrentVideo(response.data.video);
      return response.data.video;
    } catch (error) {
      toast.error('Failed to fetch video');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadVideo = async (formData, onProgress) => {
    try {
      const response = await uploadVideoService(formData, onProgress);
      toast.success('Video uploaded successfully!');
      return response.data.video;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
      throw error;
    }
  };

  const updateVideo = async (id, data) => {
    try {
      const response = await updateVideoService(id, data);
      toast.success('Video updated successfully');
      
      setVideos(prevVideos =>
        prevVideos.map(video => video._id === id ? response.data.video : video)
      );
      
      if (currentVideo?._id === id) {
        setCurrentVideo(response.data.video);
      }
      
      return response.data.video;
    } catch (error) {
      toast.error('Failed to update video');
      throw error;
    }
  };

  const deleteVideo = async (id) => {
    try {
      await deleteVideoService(id);
      toast.success('Video deleted successfully');
      setVideos(prevVideos => prevVideos.filter(video => video._id !== id));
      if (currentVideo?._id === id) {
        setCurrentVideo(null);
      }
    } catch (error) {
      toast.error('Failed to delete video');
      throw error;
    }
  };

  const updateVideoInList = useCallback((updatedVideo) => {
    setVideos(prevVideos =>
      prevVideos.map(video => 
        video._id === updatedVideo._id 
          ? { ...video, ...updatedVideo }
          : video
      )
    );
  }, []);

  const addVideoToList = useCallback((newVideo) => {
    setVideos(prevVideos => [newVideo, ...prevVideos]);
  }, []);

  return (
    <VideoContext.Provider value={{
      videos,
      currentVideo,
      loading,
      pagination,
      fetchVideos,
      fetchVideoById,
      uploadVideo,
      updateVideo,
      deleteVideo,
      updateVideoInList,
      addVideoToList,
      setCurrentVideo
    }}>
      {children}
    </VideoContext.Provider>
  );
};