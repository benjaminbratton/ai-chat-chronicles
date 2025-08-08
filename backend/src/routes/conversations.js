import express from 'express';
import Joi from 'joi';
import conversationController from '../controllers/conversationController.js';
import { authenticateToken, optionalAuth, requireRole } from '../middleware/auth.js';
import { validateRequest, validateQuery, validateParams } from '../middleware/validation.js';
import { schemas } from '../middleware/validation.js';
import { apiLimiter, searchLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', 
  apiLimiter,
  validateQuery(schemas.pagination),
  conversationController.getConversations
);

router.get('/featured',
  apiLimiter,
  conversationController.getFeaturedConversations
);

router.get('/categories',
  apiLimiter,
  conversationController.getCategories
);

router.get('/category/:category',
  apiLimiter,
  validateQuery(schemas.pagination),
  conversationController.getConversationsByCategory
);

router.get('/search',
  searchLimiter,
  validateQuery(schemas.pagination),
  conversationController.searchConversations
);

router.get('/stats',
  apiLimiter,
  conversationController.getConversationStats
);

router.get('/user/:userId',
  apiLimiter,
  validateQuery(schemas.pagination),
  conversationController.getUserConversations
);

router.get('/:id',
  apiLimiter,
  validateParams(schemas.uuidParam),
  conversationController.getConversationById
);

// Protected routes (authentication required)
router.post('/',
  apiLimiter,
  authenticateToken,
  validateRequest(schemas.conversationCreate),
  conversationController.createConversation
);

router.put('/:id',
  apiLimiter,
  authenticateToken,
  validateParams(schemas.uuidParam),
  validateRequest(schemas.conversationUpdate),
  conversationController.updateConversation
);

router.delete('/:id',
  apiLimiter,
  authenticateToken,
  validateParams(schemas.uuidParam),
  conversationController.deleteConversation
);

// Admin routes (admin role required)
router.patch('/:id/featured',
  apiLimiter,
  authenticateToken,
  requireRole(['admin']),
  validateParams(schemas.uuidParam),
  validateRequest(Joi.object({
    featured: Joi.boolean().required()
  })),
  conversationController.toggleFeatured
);

export default router;
