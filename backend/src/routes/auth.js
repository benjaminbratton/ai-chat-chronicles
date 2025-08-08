import express from 'express';
import Joi from 'joi';
import authController from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { schemas } from '../middleware/validation.js';
import { authLimiter, apiLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register',
  authLimiter,
  validateRequest(schemas.register),
  authController.register
);

router.post('/login',
  authLimiter,
  validateRequest(schemas.login),
  authController.login
);

router.post('/forgot-password',
  authLimiter,
  validateRequest(Joi.object({
    email: Joi.string().email().required()
  })),
  authController.requestPasswordReset
);

router.post('/verify-email',
  apiLimiter,
  validateRequest(Joi.object({
    token: Joi.string().required()
  })),
  authController.verifyEmail
);

router.post('/refresh-token',
  apiLimiter,
  validateRequest(Joi.object({
    refreshToken: Joi.string().required()
  })),
  authController.refreshToken
);

// OAuth routes
router.get('/oauth/:provider/url',
  apiLimiter,
  authController.getOAuthUrl
);

router.get('/oauth/:provider/callback',
  apiLimiter,
  authController.oauthCallback
);

// Protected routes (authentication required)
router.get('/me',
  apiLimiter,
  authenticateToken,
  authController.getCurrentUser
);

router.put('/profile',
  apiLimiter,
  authenticateToken,
  validateRequest(schemas.profileUpdate),
  authController.updateProfile
);

router.post('/change-password',
  apiLimiter,
  authenticateToken,
  validateRequest(Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  })),
  authController.changePassword
);

router.post('/logout',
  apiLimiter,
  authenticateToken,
  authController.logout
);

router.delete('/account',
  apiLimiter,
  authenticateToken,
  validateRequest(Joi.object({
    password: Joi.string().required()
  })),
  authController.deleteAccount
);

export default router;
