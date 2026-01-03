
// import Video from '../models/Video.js';
// import ffmpeg from 'fluent-ffmpeg';
// import path from 'path';
// import fs from 'fs';
// import sensitivityAnalysisService from './sensitivityAnalysisService.js';
// import socketService from './socketService.js';
// import logger from '../utils/logger.js';
// import { VIDEO_STATUS } from '../utils/constants.js';

// const processVideo = async (videoId) => {
//   try {
//     const video = await Video.findById(videoId);
//     if (!video) {
//       throw new Error('Video not found');
//     }

//     logger.info(`Starting video processing for ${videoId}`);

//     video.status = VIDEO_STATUS.PROCESSING;
//     video.processingProgress = 10;
//     await video.save();

//     socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
//       videoId: video._id,
//       progress: 10,
//       status: 'Extracting metadata'
//     });

//     // Extract metadata
//     const metadata = await extractMetadata(video.path);
//     video.duration = metadata.duration;
//     video.processingProgress = 30;
//     video.metadata = {
//       duration: metadata.duration,
//       format: metadata.format,
//       codec: metadata.codec
//     };
//     await video.save();

//     socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
//       videoId: video._id,
//       progress: 30,
//       status: 'Generating thumbnail'
//     });

//     // Generate thumbnail - THIS IS THE FIX
//     const thumbnailPath = await generateThumbnail(video.path, videoId);
//     if (thumbnailPath) {
//       video.thumbnailPath = thumbnailPath;
//       logger.info(`Thumbnail saved to database: ${thumbnailPath}`);
//     } else {
//       logger.warn('Thumbnail generation failed, continuing without thumbnail');
//     }
//     video.processingProgress = 60;
//     await video.save();

//     socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
//       videoId: video._id,
//       progress: 60,
//       status: 'Analyzing content'
//     });

//     // Sensitivity analysis
//     const analysisResult = await sensitivityAnalysisService.analyzeVideo(video.path);
//     video.sensitivityStatus = analysisResult.status;
//     video.metadata = {
//       ...video.metadata,
//       sensitivityScore: analysisResult.score,
//       flags: analysisResult.flags || [],
//       analysisDetails: analysisResult.details || {}
//     };
//     video.processingProgress = 100;
//     video.status = VIDEO_STATUS.COMPLETED;
//     await video.save();

//     socketService.emitToUser(video.uploadedBy.toString(), 'processing:complete', {
//       videoId: video._id,
//       status: 'completed',
//       sensitivityStatus: analysisResult.status
//     });

//     logger.info(`Video processing completed for ${videoId}`);
//   } catch (error) {
//     logger.error(`Video processing failed for ${videoId}:`, error);

//     try {
//       const video = await Video.findById(videoId);
//       if (video) {
//         video.status = VIDEO_STATUS.FAILED;
//         video.processingProgress = 0;
//         video.metadata = {
//           error: error.message,
//           failedAt: new Date().toISOString()
//         };
//         await video.save();

//         socketService.emitToUser(video.uploadedBy.toString(), 'processing:error', {
//           videoId: video._id,
//           error: error.message
//         });
//       }
//     } catch (updateError) {
//       logger.error('Failed to update video status:', updateError);
//     }
//   }
// };

// const extractMetadata = (videoPath) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(videoPath, (err, metadata) => {
//       if (err) {
//         logger.error('FFprobe error:', err);
//         return reject(new Error(`Cannot extract metadata: ${err.message}`));
//       }

//       const duration = metadata.format.duration || 0;
//       const format = metadata.format.format_name || 'unknown';
//       const codec = metadata.streams && metadata.streams[0] 
//         ? metadata.streams[0].codec_name 
//         : 'unknown';
      
//       resolve({ duration, format, codec });
//     });
//   });
// };

// const generateThumbnail = (videoPath, videoId) => {
//   return new Promise((resolve) => {
//     const uploadsDir = process.env.UPLOAD_PATH || './uploads';
//     const thumbnailFilename = `${videoId}-thumbnail.jpg`;
//     const thumbnailPath = path.join(uploadsDir, thumbnailFilename);

//     logger.info(`Generating thumbnail: ${thumbnailPath}`);

//     ffmpeg(videoPath)
//       .screenshots({
//         timestamps: ['00:00:02'],
//         filename: thumbnailFilename,
//         folder: uploadsDir,
//         size: '640x360'
//       })
//       .on('end', () => {
//         logger.info('Thumbnail generated successfully:', thumbnailPath);
        
//         // Verify file exists
//         if (fs.existsSync(thumbnailPath)) {
//           logger.info('Thumbnail file verified on disk');
//           resolve(thumbnailPath);
//         } else {
//           logger.error('Thumbnail file not found after generation');
//           resolve(null);
//         }
//       })
//       .on('error', (err) => {
//         logger.error('Thumbnail generation error:', err);
//         resolve(null);
//       });
//   });
// };

// export default { processVideo };





































import Video from '../models/Video.js';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import sensitivityAnalysisService from './sensitivityAnalysisService.js';
import socketService from './socketService.js';
import logger from '../utils/logger.js';
import { VIDEO_STATUS } from '../utils/constants.js';

const processVideo = async (videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    logger.info(`Starting video processing for ${videoId}`);

    video.status = VIDEO_STATUS.PROCESSING;
    video.processingProgress = 10;
    await video.save();

    socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
      videoId: video._id,
      progress: 10,
      status: 'Extracting metadata'
    });

    // Extract metadata
    const metadata = await extractMetadata(video.path);
    video.duration = metadata.duration;
    video.processingProgress = 30;
    video.metadata = {
      duration: metadata.duration,
      format: metadata.format,
      codec: metadata.codec
    };
    await video.save();

    socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
      videoId: video._id,
      progress: 30,
      status: 'Generating thumbnail'
    });

    // Generate thumbnail as base64
    const thumbnailBase64 = await generateThumbnailBase64(video.path, videoId);
    if (thumbnailBase64) {
      video.thumbnail = thumbnailBase64; // Store base64 in database
      logger.info(`Thumbnail stored as base64 in database`);
    }
    video.processingProgress = 60;
    await video.save();

    socketService.emitToUser(video.uploadedBy.toString(), 'processing:progress', {
      videoId: video._id,
      progress: 60,
      status: 'Analyzing content'
    });

    // Sensitivity analysis
    const analysisResult = await sensitivityAnalysisService.analyzeVideo(video.path);
    video.sensitivityStatus = analysisResult.status;
    video.metadata = {
      ...video.metadata,
      sensitivityScore: analysisResult.score,
      flags: analysisResult.flags || [],
      analysisDetails: analysisResult.details || {}
    };
    video.processingProgress = 100;
    video.status = VIDEO_STATUS.COMPLETED;
    await video.save();

    socketService.emitToUser(video.uploadedBy.toString(), 'processing:complete', {
      videoId: video._id,
      status: 'completed',
      sensitivityStatus: analysisResult.status
    });

    logger.info(`Video processing completed for ${videoId}`);
  } catch (error) {
    logger.error(`Video processing failed for ${videoId}:`, error);

    try {
      const video = await Video.findById(videoId);
      if (video) {
        video.status = VIDEO_STATUS.FAILED;
        video.processingProgress = 0;
        video.metadata = {
          error: error.message,
          failedAt: new Date().toISOString()
        };
        await video.save();

        socketService.emitToUser(video.uploadedBy.toString(), 'processing:error', {
          videoId: video._id,
          error: error.message
        });
      }
    } catch (updateError) {
      logger.error('Failed to update video status:', updateError);
    }
  }
};

const extractMetadata = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        logger.error('FFprobe error:', err);
        return reject(new Error(`Cannot extract metadata: ${err.message}`));
      }

      const duration = metadata.format.duration || 0;
      const format = metadata.format.format_name || 'unknown';
      const codec = metadata.streams && metadata.streams[0] 
        ? metadata.streams[0].codec_name 
        : 'unknown';
      
      resolve({ duration, format, codec });
    });
  });
};

const generateThumbnailBase64 = (videoPath, videoId) => {
  return new Promise((resolve) => {
    const uploadsDir = process.env.UPLOAD_PATH || './uploads';
    const thumbnailFilename = `${videoId}-thumbnail.jpg`;
    const thumbnailPath = path.join(uploadsDir, thumbnailFilename);

    logger.info(`Generating thumbnail: ${thumbnailPath}`);

    ffmpeg(videoPath)
      .screenshots({
        timestamps: ['00:00:02'],
        filename: thumbnailFilename,
        folder: uploadsDir,
        size: '640x360'
      })
      .on('end', () => {
        logger.info('Thumbnail generated, converting to base64');
        
        if (fs.existsSync(thumbnailPath)) {
          try {
            const imageBuffer = fs.readFileSync(thumbnailPath);
            const base64Image = imageBuffer.toString('base64');
            const base64Data = `data:image/jpeg;base64,${base64Image}`;
            
            // Delete the file after converting to base64
            fs.unlinkSync(thumbnailPath);
            logger.info('Thumbnail converted to base64 and file deleted');
            
            resolve(base64Data);
          } catch (err) {
            logger.error('Error converting to base64:', err);
            resolve(null);
          }
        } else {
          logger.error('Thumbnail file not found after generation');
          resolve(null);
        }
      })
      .on('error', (err) => {
        logger.error('Thumbnail generation error:', err);
        resolve(null);
      });
  });
};

export default { processVideo };