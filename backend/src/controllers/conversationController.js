import conversationService from '../services/conversationService.js';
import logger from '../utils/logger.js';

class ConversationController {
  // Get conversations with pagination and filtering
  async getConversations(req, res) {
    try {
      const { page, limit, category, search, sort, order } = req.validatedQuery || req.query;
      
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        category,
        search,
        sort: sort || 'created_at',
        order: order || 'desc'
      };

      const result = await conversationService.getConversations(options);

      res.json({
        success: true,
        data: result.conversations,
        pagination: result.pagination
      });
    } catch (error) {
      logger.error('ConversationController.getConversations error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_FETCH_ERROR'
      });
    }
  }

  // Get a single conversation by ID
  async getConversationById(req, res) {
    try {
      const { id } = req.validatedParams || req.params;
      
      const conversation = await conversationService.getConversationById(id);

      res.json({
        success: true,
        data: conversation
      });
    } catch (error) {
      logger.error('ConversationController.getConversationById error:', error);
      
      if (error.message === 'Conversation not found') {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
          code: 'CONVERSATION_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_FETCH_ERROR'
      });
    }
  }

  // Create a new conversation
  async createConversation(req, res) {
    try {
      const conversationData = req.validatedBody || req.body;
      const authorId = req.user.id;

      const conversation = await conversationService.createConversation(conversationData, authorId);

      res.status(201).json({
        success: true,
        data: conversation,
        message: 'Conversation created successfully'
      });
    } catch (error) {
      logger.error('ConversationController.createConversation error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_CREATE_ERROR'
      });
    }
  }

  // Update a conversation
  async updateConversation(req, res) {
    try {
      const { id } = req.validatedParams || req.params;
      const updates = req.validatedBody || req.body;
      const authorId = req.user.id;

      const conversation = await conversationService.updateConversation(id, updates, authorId);

      res.json({
        success: true,
        data: conversation,
        message: 'Conversation updated successfully'
      });
    } catch (error) {
      logger.error('ConversationController.updateConversation error:', error);
      
      if (error.message === 'Unauthorized to update this conversation') {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized to update this conversation',
          code: 'UNAUTHORIZED_UPDATE'
        });
      }

      if (error.message === 'Conversation not found') {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
          code: 'CONVERSATION_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_UPDATE_ERROR'
      });
    }
  }

  // Delete a conversation
  async deleteConversation(req, res) {
    try {
      const { id } = req.validatedParams || req.params;
      const authorId = req.user.id;

      await conversationService.deleteConversation(id, authorId);

      res.json({
        success: true,
        message: 'Conversation deleted successfully'
      });
    } catch (error) {
      logger.error('ConversationController.deleteConversation error:', error);
      
      if (error.message === 'Unauthorized to delete this conversation') {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized to delete this conversation',
          code: 'UNAUTHORIZED_DELETE'
        });
      }

      if (error.message === 'Conversation not found') {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
          code: 'CONVERSATION_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_DELETE_ERROR'
      });
    }
  }

  // Get featured conversations
  async getFeaturedConversations(req, res) {
    try {
      const { limit } = req.query;
      const conversations = await conversationService.getFeaturedConversations(parseInt(limit) || 3);

      res.json({
        success: true,
        data: conversations
      });
    } catch (error) {
      logger.error('ConversationController.getFeaturedConversations error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FEATURED_CONVERSATIONS_ERROR'
      });
    }
  }

  // Get conversations by category
  async getConversationsByCategory(req, res) {
    try {
      const { category } = req.params;
      const { page, limit, sort, order } = req.query;
      
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        sort: sort || 'created_at',
        order: order || 'desc'
      };

      const result = await conversationService.getConversationsByCategory(category, options);

      res.json({
        success: true,
        data: result.conversations,
        pagination: result.pagination
      });
    } catch (error) {
      logger.error('ConversationController.getConversationsByCategory error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CATEGORY_CONVERSATIONS_ERROR'
      });
    }
  }

  // Search conversations
  async searchConversations(req, res) {
    try {
      const { q: searchTerm } = req.query;
      const { page, limit, sort, order } = req.query;
      
      if (!searchTerm || searchTerm.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Search term is required',
          code: 'MISSING_SEARCH_TERM'
        });
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        sort: sort || 'created_at',
        order: order || 'desc'
      };

      const result = await conversationService.searchConversations(searchTerm, options);

      res.json({
        success: true,
        data: result.conversations,
        pagination: result.pagination,
        searchTerm
      });
    } catch (error) {
      logger.error('ConversationController.searchConversations error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'SEARCH_CONVERSATIONS_ERROR'
      });
    }
  }

  // Get user's conversations
  async getUserConversations(req, res) {
    try {
      const { userId } = req.params;
      const { page, limit, sort, order } = req.query;
      
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        sort: sort || 'created_at',
        order: order || 'desc'
      };

      const result = await conversationService.getUserConversations(userId, options);

      res.json({
        success: true,
        data: result.conversations,
        pagination: result.pagination
      });
    } catch (error) {
      logger.error('ConversationController.getUserConversations error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'USER_CONVERSATIONS_ERROR'
      });
    }
  }

  // Toggle conversation featured status (admin only)
  async toggleFeatured(req, res) {
    try {
      const { id } = req.validatedParams || req.params;
      const { featured } = req.validatedBody || req.body;

      const conversation = await conversationService.toggleFeatured(id, featured);

      res.json({
        success: true,
        data: conversation,
        message: `Conversation ${featured ? 'featured' : 'unfeatured'} successfully`
      });
    } catch (error) {
      logger.error('ConversationController.toggleFeatured error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'TOGGLE_FEATURED_ERROR'
      });
    }
  }

  // Get conversation statistics
  async getConversationStats(req, res) {
    try {
      const stats = await conversationService.getConversationStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error('ConversationController.getConversationStats error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CONVERSATION_STATS_ERROR'
      });
    }
  }

  // Get conversation categories
  async getCategories(req, res) {
    try {
      // This would typically come from a categories table or be hardcoded
      const categories = [
        'Philosophy',
        'Technology',
        'Science',
        'Politics',
        'Culture',
        'Economics',
        'Environment',
        'Health',
        'Education',
        'Entertainment'
      ];

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      logger.error('ConversationController.getCategories error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'CATEGORIES_ERROR'
      });
    }
  }
}

export default new ConversationController();
