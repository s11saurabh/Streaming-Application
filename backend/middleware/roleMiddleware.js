import { errorResponse } from '../utils/responseHandler.js';
import { ERROR_MESSAGES, ROLES } from '../utils/constants.js';

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    next();
  };
};

export const checkOwnership = (resourceUserId) => {
  return (req, res, next) => {
    if (req.user.role === ROLES.ADMIN) {
      return next();
    }

    if (req.user._id.toString() !== resourceUserId.toString()) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    next();
  };
};

export const checkOrganization = (req, res, next) => {
  if (req.user.role === ROLES.ADMIN) {
    return next();
  }

  if (req.resource && req.resource.organization !== req.user.organization) {
    return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
  }

  next();
};