import { supabase } from '../config/database.js';
import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';

class ConversationService {
  constructor() {
    this.cacheExpiry = 300; // 5 minutes
  }

  // Get conversations with pagination, filtering, and search
  async getConversations(options = {}) {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sort = 'created_at',
      order = 'desc',
      authorId,
      published = true
    } = options;

    const cacheKey = `conversations:${JSON.stringify(options)}`;
    
    try {
      // Try to get from cache first
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        logger.info('Conversations served from cache');
        return cached;
      }

      let query = supabase
        .from('conversations')
        .select(`
          *,
          profiles!conversations_author_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          ),
          likes_count:likes(count),
          comments_count:comments(count)
        `, { count: 'exact' });

      // Apply filters
      if (published !== undefined) {
        query = query.eq('published', published);
      }

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (authorId) {
        query = query.eq('author_id', authorId);
      }

      if (search && search.trim()) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      // Apply sorting
      query = query.order(sort, { ascending: order === 'asc' });

      // Apply pagination
      const startIndex = (page - 1) * limit;
      query = query.range(startIndex, startIndex + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Error fetching conversations:', error);
        throw new Error(`Failed to fetch conversations: ${error.message}`);
      }

      const result = {
        conversations: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
          hasNextPage: startIndex + limit < (count || 0),
          hasPreviousPage: page > 1
        }
      };

      // Cache the result
      await redisClient.set(cacheKey, result, this.cacheExpiry);

      return result;
    } catch (error) {
      logger.error('ConversationService.getConversations error:', error);
      throw error;
    }
  }

  // Get a single conversation by ID
  async getConversationById(id, includeAuthor = true) {
    const cacheKey = `conversation:${id}`;
    
    try {
      // Try to get from cache first
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        logger.info('Conversation served from cache');
        return cached;
      }

      let query = supabase
        .from('conversations')
        .select(`
          *,
          ${includeAuthor ? 'profiles!conversations_author_id_fkey (*),' : ''}
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .eq('id', id)
        .single();

      const { data, error } = await query;

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Conversation not found');
        }
        logger.error('Error fetching conversation:', error);
        throw new Error(`Failed to fetch conversation: ${error.message}`);
      }

      // Cache the result
      await redisClient.set(cacheKey, data, this.cacheExpiry);

      return data;
    } catch (error) {
      logger.error('ConversationService.getConversationById error:', error);
      throw error;
    }
  }

  // Create a new conversation
  async createConversation(conversationData, authorId) {
    try {
      const conversation = {
        ...conversationData,
        author_id: authorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('conversations')
        .insert([conversation])
        .select(`
          *,
          profiles!conversations_author_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .single();

      if (error) {
        logger.error('Error creating conversation:', error);
        throw new Error(`Failed to create conversation: ${error.message}`);
      }

      // Clear related caches
      await this.clearConversationCaches();

      logger.info('Conversation created successfully', { id: data.id, authorId });
      return data;
    } catch (error) {
      logger.error('ConversationService.createConversation error:', error);
      throw error;
    }
  }

  // Update a conversation
  async updateConversation(id, updates, authorId) {
    try {
      // Verify ownership
      const existing = await this.getConversationById(id, false);
      if (existing.author_id !== authorId) {
        throw new Error('Unauthorized to update this conversation');
      }

      const conversation = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('conversations')
        .update(conversation)
        .eq('id', id)
        .select(`
          *,
          profiles!conversations_author_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .single();

      if (error) {
        logger.error('Error updating conversation:', error);
        throw new Error(`Failed to update conversation: ${error.message}`);
      }

      // Clear related caches
      await this.clearConversationCaches(id);

      logger.info('Conversation updated successfully', { id, authorId });
      return data;
    } catch (error) {
      logger.error('ConversationService.updateConversation error:', error);
      throw error;
    }
  }

  // Delete a conversation
  async deleteConversation(id, authorId) {
    try {
      // Verify ownership
      const existing = await this.getConversationById(id, false);
      if (existing.author_id !== authorId) {
        throw new Error('Unauthorized to delete this conversation');
      }

      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Error deleting conversation:', error);
        throw new Error(`Failed to delete conversation: ${error.message}`);
      }

      // Clear related caches
      await this.clearConversationCaches(id);

      logger.info('Conversation deleted successfully', { id, authorId });
      return true;
    } catch (error) {
      logger.error('ConversationService.deleteConversation error:', error);
      throw error;
    }
  }

  // Get featured conversations
  async getFeaturedConversations(limit = 3) {
    const cacheKey = `featured_conversations:${limit}`;
    
    try {
      // Try to get from cache first
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return cached;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          profiles!conversations_author_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          ),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        logger.error('Error fetching featured conversations:', error);
        throw new Error(`Failed to fetch featured conversations: ${error.message}`);
      }

      // If no featured posts, get recent ones
      if (!data || data.length === 0) {
        const { data: recentData, error: recentError } = await supabase
          .from('conversations')
          .select(`
            *,
            profiles!conversations_author_id_fkey (
              id,
              full_name,
              username,
              avatar_url
            ),
            likes_count:likes(count),
            comments_count:comments(count)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (recentError) throw recentError;
        
        // Cache the result
        await redisClient.set(cacheKey, recentData || [], this.cacheExpiry);
        return recentData || [];
      }

      // Cache the result
      await redisClient.set(cacheKey, data, this.cacheExpiry);
      return data;
    } catch (error) {
      logger.error('ConversationService.getFeaturedConversations error:', error);
      throw error;
    }
  }

  // Get conversations by category
  async getConversationsByCategory(category, options = {}) {
    return this.getConversations({ ...options, category });
  }

  // Search conversations
  async searchConversations(searchTerm, options = {}) {
    return this.getConversations({ ...options, search: searchTerm });
  }

  // Get user's conversations
  async getUserConversations(userId, options = {}) {
    return this.getConversations({ ...options, authorId: userId });
  }

  // Toggle conversation featured status (admin only)
  async toggleFeatured(id, featured) {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .update({ featured, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Error toggling featured status:', error);
        throw new Error(`Failed to toggle featured status: ${error.message}`);
      }

      // Clear related caches
      await this.clearConversationCaches(id);

      logger.info('Conversation featured status updated', { id, featured });
      return data;
    } catch (error) {
      logger.error('ConversationService.toggleFeatured error:', error);
      throw error;
    }
  }

  // Get conversation statistics
  async getConversationStats() {
    const cacheKey = 'conversation_stats';
    
    try {
      // Try to get from cache first
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return cached;
      }

      const [
        { count: totalConversations },
        { count: publishedConversations },
        { count: featuredConversations },
        { count: totalLikes },
        { count: totalComments }
      ] = await Promise.all([
        supabase.from('conversations').select('*', { count: 'exact', head: true }),
        supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('featured', true),
        supabase.from('likes').select('*', { count: 'exact', head: true }),
        supabase.from('comments').select('*', { count: 'exact', head: true })
      ]);

      const stats = {
        totalConversations: totalConversations || 0,
        publishedConversations: publishedConversations || 0,
        featuredConversations: featuredConversations || 0,
        totalLikes: totalLikes || 0,
        totalComments: totalComments || 0,
        lastUpdated: new Date().toISOString()
      };

      // Cache for 1 hour
      await redisClient.set(cacheKey, stats, 3600);

      return stats;
    } catch (error) {
      logger.error('ConversationService.getConversationStats error:', error);
      throw error;
    }
  }

  // Clear conversation caches
  async clearConversationCaches(conversationId = null) {
    try {
      const keys = ['conversations:*', 'featured_conversations:*', 'conversation_stats'];
      
      if (conversationId) {
        keys.push(`conversation:${conversationId}`);
      }

      // Note: In a real Redis implementation, you would use SCAN to find and delete keys
      // For now, we'll just log that cache clearing is needed
      logger.info('Conversation caches need to be cleared', { conversationId, keys });
    } catch (error) {
      logger.error('Error clearing conversation caches:', error);
    }
  }
}

export default new ConversationService();
