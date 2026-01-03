import User from '../models/User.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseHandler.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = req.user.role === 'admin' 
      ? {} 
      : { organization: req.user.organization };

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    paginatedResponse(res, users, page, limit, total);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return errorResponse(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (req.user.role !== 'admin' && user.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    successResponse(res, { user }, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, role, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (req.user.role !== 'admin' && user.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    if (name) user.name = name;
    if (role && req.user.role === 'admin') user.role = role;
    if (typeof isActive !== 'undefined' && req.user.role === 'admin') user.isActive = isActive;

    await user.save();

    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (req.user.role !== 'admin' && user.organization !== req.user.organization) {
      return errorResponse(res, ERROR_MESSAGES.FORBIDDEN, 403);
    }

    await user.deleteOne();

    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};