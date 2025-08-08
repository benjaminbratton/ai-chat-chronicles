import rateLimit from 'express-rate-limit';
import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';

// Redis store for rate limiting
const RedisStore = {
  incr: async (key) => {
    try {
      const count = await redisClient.incr(key);
      await redisClient.expire(key, 60); // 1 minute window
      return { totalHits: count };
    } catch (error) {
      logger.error('Redis rate limit error:', error);
      return { totalHits: 1 };
    }
  },
  
  decrement: async (key) => {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error('Redis decrement error:', error);
    }
  },
  
  resetKey: async (key) => {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error('Redis reset key error:', error);
    }
  }
};

// General API rate limiter
export const apiLimiter = rateLimit({
  store: RedisStore,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  store: RedisStore,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Auth rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(429).json({
      error: 'Too many authentication attempts, please try again later.',
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter for file uploads
export const uploadLimiter = rateLimit({
  store: RedisStore,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 uploads per hour
  message: {
    error: 'Too many file uploads, please try again later.',
    code: 'UPLOAD_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Upload rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(429).json({
      error: 'Too many file uploads, please try again later.',
      code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter for search endpoints
export const searchLimiter = rateLimit({
  store: RedisStore,
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 searches per minute
  message: {
    error: 'Too many search requests, please try again later.',
    code: 'SEARCH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Search rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(429).json({
      error: 'Too many search requests, please try again later.',
      code: 'SEARCH_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Dynamic rate limiter based on user role
export const dynamicLimiter = (defaultLimit = 100, premiumLimit = 500) => {
  return rateLimit({
    store: RedisStore,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: (req) => {
      // Check if user is authenticated and has premium role
      if (req.user && req.profile?.role === 'premium') {
        return premiumLimit;
      }
      return defaultLimit;
    },
    message: {
      error: 'Rate limit exceeded for your account type.',
      code: 'DYNAMIC_RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Dynamic rate limit exceeded', {
        ip: req.ip,
        userId: req.user?.id,
        role: req.profile?.role,
        path: req.path
      });
      
      res.status(429).json({
        error: 'Rate limit exceeded for your account type.',
        code: 'DYNAMIC_RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
      });
    }
  });
};

// Whitelist certain IPs (for development, monitoring, etc.)
export const whitelistIPs = (req, res, next) => {
  const whitelistedIPs = process.env.WHITELISTED_IPS?.split(',') || [];
  
  if (whitelistedIPs.includes(req.ip)) {
    req.rateLimit = { current: 0, limit: 999999, remaining: 999999 };
  }
  
  next();
};
