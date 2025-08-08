import Joi from 'joi';
import logger from '../utils/logger.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type
      }));

      logger.warn('Validation error', {
        path: req.path,
        method: req.method,
        errors: errorDetails
      });

      return res.status(400).json({
        error: 'Validation failed',
        details: errorDetails,
        code: 'VALIDATION_ERROR'
      });
    }

    req.validatedBody = value;
    next();
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type
      }));

      return res.status(400).json({
        error: 'Query validation failed',
        details: errorDetails,
        code: 'QUERY_VALIDATION_ERROR'
      });
    }

    req.validatedQuery = value;
    next();
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type
      }));

      return res.status(400).json({
        error: 'Parameter validation failed',
        details: errorDetails,
        code: 'PARAM_VALIDATION_ERROR'
      });
    }

    req.validatedParams = value;
    next();
  };
};

// Common validation schemas
export const schemas = {
  // User registration
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    full_name: Joi.string().min(2).max(100).required(),
    username: Joi.string().alphanum().min(3).max(30).optional()
  }),

  // User login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Profile update
  profileUpdate: Joi.object({
    full_name: Joi.string().min(2).max(100).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    title: Joi.string().max(200).optional(),
    bio: Joi.string().max(1000).optional(),
    location: Joi.string().max(100).optional(),
    website: Joi.string().uri().optional(),
    interests: Joi.array().items(Joi.string()).optional()
  }),

  // Conversation creation
  conversationCreate: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(10).required(),
    excerpt: Joi.string().max(300).optional(),
    category: Joi.string().required(),
    read_time: Joi.number().integer().min(1).max(60).optional(),
    published: Joi.boolean().optional()
  }),

  // Conversation update
  conversationUpdate: Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    content: Joi.string().min(10).optional(),
    excerpt: Joi.string().max(300).optional(),
    category: Joi.string().optional(),
    read_time: Joi.number().integer().min(1).max(60).optional(),
    published: Joi.boolean().optional(),
    featured: Joi.boolean().optional()
  }),

  // Comment creation
  commentCreate: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    parent_id: Joi.string().uuid().optional()
  }),

  // Comment update
  commentUpdate: Joi.object({
    content: Joi.string().min(1).max(1000).required()
  }),

  // Seminar creation
  seminarCreate: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(10).max(1000).required(),
    scheduled_at: Joi.date().iso().greater('now').required(),
    duration_minutes: Joi.number().integer().min(15).max(480).optional(),
    max_participants: Joi.number().integer().min(1).max(1000).optional(),
    category: Joi.string().required(),
    meeting_url: Joi.string().uri().optional()
  }),

  // Seminar update
  seminarUpdate: Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    scheduled_at: Joi.date().iso().optional(),
    duration_minutes: Joi.number().integer().min(15).max(480).optional(),
    max_participants: Joi.number().integer().min(1).max(1000).optional(),
    category: Joi.string().optional(),
    status: Joi.string().valid('upcoming', 'live', 'completed', 'cancelled').optional(),
    meeting_url: Joi.string().uri().optional()
  }),

  // Pagination query
  pagination: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().min(1).max(100).optional(),
    category: Joi.string().optional(),
    sort: Joi.string().valid('created_at', 'updated_at', 'title', 'likes_count').optional(),
    order: Joi.string().valid('asc', 'desc').optional()
  }),

  // UUID parameter
  uuidParam: Joi.object({
    id: Joi.string().uuid().required()
  }),

  // File upload
  fileUpload: Joi.object({
    file: Joi.object({
      mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/webp').required(),
      size: Joi.number().max(5 * 1024 * 1024).required() // 5MB max
    }).required()
  })
};

// Custom validation functions
export const validateObjectId = (value, helpers) => {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateSlug = (value, helpers) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};
