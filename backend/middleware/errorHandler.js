import logger from '../utils/logger.js';
import { errorResponse } from '../utils/responseHandler.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return errorResponse(res, 'Validation Error', 400, errors);
  }

  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  if (err.code === 11000) {
    return errorResponse(res, 'Duplicate field value entered', 400);
  }

  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  return errorResponse(res, err.message || 'Server Error', err.statusCode || 500);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};