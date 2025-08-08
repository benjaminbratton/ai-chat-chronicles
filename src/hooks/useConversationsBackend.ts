import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { conversationsAPI, authAPI } from '@/lib/api';
import type { Conversation } from '@/lib/api';

export const useConversations = (category?: string, limit: number = 12, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ['conversations', category, limit, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching conversations from backend API...', { category, page: pageParam + 1, limit, searchQuery });
      
      const response = await conversationsAPI.getConversations({
        page: pageParam + 1,
        limit,
        category: category === 'All' ? undefined : category,
        search: searchQuery,
      });

      const conversations = response.data || [];
      
      // Transform the data to match the expected format
      const transformedConversations = conversations.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        content: conv.content,
        excerpt: conv.excerpt,
        category: conv.category,
        published: conv.published,
        created_at: conv.createdAt,
        updated_at: conv.createdAt, // Using createdAt as updated_at for now
        author_id: conv.author?.id || 'admin-001',
        read_time: conv.readTime,
        featured: conv.featured,
        profiles: conv.author ? {
          id: conv.author.id,
          full_name: conv.author.name,
          username: conv.author.username,
          avatar_url: conv.author.avatar,
        } : undefined,
        likes_count: conv.likes,
        comments_count: conv.comments,
      }));

      // For now, we'll simulate pagination since our backend doesn't support it yet
      const total = conversations.length;
      const hasNextPage = false; // No pagination in demo backend

      console.log(`Fetched ${transformedConversations.length} conversations from backend`);

      return {
        conversations: transformedConversations,
        total,
        page: pageParam + 1,
        limit,
        hasNextPage,
        hasPreviousPage: pageParam > 0
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationData: any) => {
      // Get the auth token
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Transform the data to match backend expectations
      const transformedData = {
        title: conversationData.title,
        content: conversationData.content,
        excerpt: conversationData.excerpt,
        category: conversationData.category,
        readTime: conversationData.read_time,
        published: conversationData.published,
        featured: conversationData.featured || false,
      };

      const response = await conversationsAPI.createConversation(transformedData, token);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useFeaturedConversations = () => {
  return useInfiniteQuery({
    queryKey: ['featured-conversations'],
    queryFn: async () => {
      const response = await conversationsAPI.getFeaturedConversations();
      
      const conversations = response.data || [];
      
      // Transform the data to match the expected format
      const transformedConversations = conversations.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        content: conv.content,
        excerpt: conv.excerpt,
        category: conv.category,
        published: conv.published,
        created_at: conv.createdAt,
        updated_at: conv.createdAt,
        author_id: conv.author?.id || 'admin-001',
        read_time: conv.readTime,
        featured: conv.featured,
        profiles: conv.author ? {
          id: conv.author.id,
          full_name: conv.author.name,
          username: conv.author.username,
          avatar_url: conv.author.avatar,
        } : undefined,
        likes_count: conv.likes,
        comments_count: conv.comments,
      }));

      return {
        conversations: transformedConversations,
        total: transformedConversations.length,
        page: 1,
        limit: transformedConversations.length,
        hasNextPage: false,
        hasPreviousPage: false
      };
    },
    getNextPageParam: () => undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useConversationStats = () => {
  return useInfiniteQuery({
    queryKey: ['conversation-stats'],
    queryFn: async () => {
      const response = await conversationsAPI.getStats();
      return response.data;
    },
    getNextPageParam: () => undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCategories = () => {
  return useInfiniteQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await conversationsAPI.getCategories();
      return response.data;
    },
    getNextPageParam: () => undefined,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000, // Cache categories longer
    refetchOnWindowFocus: false,
  });
};
