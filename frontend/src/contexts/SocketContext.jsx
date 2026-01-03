import React, { createContext, useEffect, useContext } from 'react';
import socketService from '../services/socketService';
import { AuthContext } from './AuthContext';
import { getToken } from '../services/authService';
import { toast } from 'react-toastify';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = getToken();
      socketService.connect(token);

      socketService.on('processing:progress', (data) => {
        console.log('Processing progress:', data);
      });

      socketService.on('processing:complete', (data) => {
        console.log('Processing complete:', data);
        toast.success('Video processing completed');
      });

      socketService.on('processing:error', (data) => {
        console.error('Processing error:', data);
        toast.error(`Video processing failed: ${data.error}`);
      });

      socketService.on('upload:progress', (data) => {
        console.log('Upload progress:', data);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket: socketService }}>
      {children}
    </SocketContext.Provider>
  );
};