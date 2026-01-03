import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketContext';

const useSocket = (event, callback) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket && event && callback) {
      socket.on(event, callback);

      return () => {
        socket.off(event, callback);
      };
    }
  }, [socket, event, callback]);

  return socket;
};

export default useSocket;