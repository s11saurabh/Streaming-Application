import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, organization } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, ERROR_MESSAGES.USER_EXISTS, 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'viewer',
      organization: organization || 'default'
    });

    const token = generateToken(user._id);

    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization
      },
      token
    }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
    }

    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    const token = generateToken(user._id);

    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization
      },
      token
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    successResponse(res, { user }, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (name) user.name = name;
    await user.save();

    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};