import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/responseHandler.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
    }

    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
    }

    next();
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
  }
};