import fs from 'fs/promises';
import path from 'path';
import logger from '../utils/logger.js';

class StorageService {
  async saveFile(file, destination) {
    try {
      const dir = path.dirname(destination);
      await fs.mkdir(dir, { recursive: true });
      await fs.copyFile(file.path, destination);
      return destination;
    } catch (error) {
      logger.error(`Storage error: ${error.message}`);
      throw new Error('Failed to save file');
    }
  }

  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      logger.info(`File deleted: ${filePath}`);
    } catch (error) {
      logger.error(`Delete error: ${error.message}`);
    }
  }

  async getFileStats(filePath) {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      logger.error(`File stats error: ${error.message}`);
      return null;
    }
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

export default new StorageService();