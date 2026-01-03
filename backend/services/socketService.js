import { getIO } from '../config/socket.js';
import logger from '../utils/logger.js';

class SocketService {
  emitToUser(userId, event, data) {
    try {
      const io = getIO();
      io.to(userId.toString()).emit(event, data);
      logger.debug(`Emitted ${event} to user ${userId}`);
    } catch (error) {
      logger.error(`Socket emit error: ${error.message}`);
    }
  }

  emitProcessingProgress(userId, videoId, progress) {
    this.emitToUser(userId, 'processing:progress', {
      videoId,
      progress,
      timestamp: new Date()
    });
  }

  emitProcessingComplete(userId, videoId, status) {
    this.emitToUser(userId, 'processing:complete', {
      videoId,
      status,
      timestamp: new Date()
    });
  }

  emitProcessingError(userId, videoId, error) {
    this.emitToUser(userId, 'processing:error', {
      videoId,
      error,
      timestamp: new Date()
    });
  }

  emitUploadProgress(userId, filename, progress) {
    this.emitToUser(userId, 'upload:progress', {
      filename,
      progress,
      timestamp: new Date()
    });
  }
}

export default new SocketService();