import api from './api';

export const uploadVideo = async (formData, onUploadProgress) => {
  const response = await api.post('/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });
  return response.data;
};

export const getVideos = async (params = {}) => {
  const response = await api.get('/videos', { params });
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const updateVideo = async (id, data) => {
  const response = await api.put(`/videos/${id}`, data);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/videos/${id}`);
  return response.data;
};

export const getStreamUrl = (videoId) => {
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}/api/stream/${videoId}`;
};

export const getThumbnailUrl = (videoId) => {
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}/api/stream/${videoId}/thumbnail`;
};