import Video from '../models/Video.js';
import videoProcessingService from '../services/videoProcessingService.js';
import storageService from '../services/storageService.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseHandler.js';
import { ERROR_MESSAGES, VIDEO_STATUS } from '../utils/constants.js';

export const uploadVideo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const video = await Video.create({
      title,
      description,
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimeType: file.mimetype,
      uploadedBy: req.user._id,
      organization: req.user.organization,
      status: VIDEO_STATUS.PROCESSING
    });

    videoProcessingService.processVideo(video._id).catch(err => {
      console.error('Background processing error:', err);
    });

    successResponse(res, { video }, 'Video uploaded successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const query = { organization: req.user.organization };

    if (req.user.role !== 'admin') {
      query.uploadedBy = req.user._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.sensitivityStatus) {
      query.sensitivityStatus = req.query.sensitivityStatus;
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Video.countDocuments(query);

    paginatedResponse(res, videos, page, limit, total);
  } catch (error) {
    next(error);
  }
};

export const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploadedBy', 'name email');

    if (!video) {
      return errorResponse(res, ERROR_MESSAGES.VIDEO_NOT_FOUND, 404);
    }

    if (video.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (req.user.role !== 'admin' && video.uploadedBy._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    successResponse(res, { video }, 'Video fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const video = await Video.findById(req.params.id);
    if (!video) {
      return errorResponse(res, ERROR_MESSAGES.VIDEO_NOT_FOUND, 404);
    }

    if (video.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (req.user.role !== 'admin' && video.uploadedBy.toString() !== req.user._id.toString()) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (title) video.title = title;
    if (description) video.description = description;

    await video.save();

    successResponse(res, { video }, 'Video updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return errorResponse(res, ERROR_MESSAGES.VIDEO_NOT_FOUND, 404);
    }

    if (video.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (req.user.role !== 'admin' && video.uploadedBy.toString() !== req.user._id.toString()) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    await storageService.deleteFile(video.path);
    if (video.thumbnailPath) {
      await storageService.deleteFile(video.thumbnailPath);
    }

    await video.deleteOne();

    successResponse(res, null, 'Video deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const analyzeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return errorResponse(res, ERROR_MESSAGES.VIDEO_NOT_FOUND, 404);
    }

    if (video.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (req.user.role !== 'admin' && video.uploadedBy.toString() !== req.user._id.toString()) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    videoProcessingService.processVideo(video._id).catch(err => {
      console.error('Background processing error:', err);
    });

    successResponse(res, { video }, 'Video analysis started');
  } catch (error) {
    next(error);
  }
};