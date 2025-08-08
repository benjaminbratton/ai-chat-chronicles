import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Simple API call function with fallback
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`http://localhost:3001${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    // Return fallback data
    return { success: true, data: [] };
  }
}

export const useConversations = (category?: string, limit: number = 12, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ['conversations', category, limit, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching conversations from backend API...', { category, page: pageParam + 1, limit, searchQuery });
      
      try {
        const response = await apiCall('/api/v1/conversations');
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

        console.log(`Fetched ${transformedConversations.length} conversations from backend`);

        return {
          conversations: transformedConversations,
          total: transformedConversations.length,
          page: pageParam + 1,
          limit,
          hasNextPage: false,
          hasPreviousPage: pageParam > 0
        };
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        return {
          conversations: [],
          total: 0,
          page: pageParam + 1,
          limit,
          hasNextPage: false,
          hasPreviousPage: pageParam > 0
        };
      }
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

      try {
        console.log('Making API call to create conversation:', { endpoint: '/api/v1/conversations', data: transformedData });
        const response = await apiCall('/api/v1/conversations', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(transformedData),
        });
        console.log('API response received:', response);
        return response.data;
      } catch (error) {
        console.error('Failed to create conversation:', error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to create conversation. Please ensure you are logged in and the backend is available.');
      }
    },
    onSuccess: (data) => {
      console.log('Mutation onSuccess called with data:', data);
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useFeaturedConversations = () => {
  return useInfiniteQuery({
    queryKey: ['featured-conversations'],
    queryFn: async () => {
      try {
        const response = await apiCall('/api/v1/conversations/featured');
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
      } catch (error) {
        console.error('Failed to fetch featured conversations:', error);
        return {
          conversations: [],
          total: 0,
          page: 1,
          limit: 0,
          hasNextPage: false,
          hasPreviousPage: false
        };
      }
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
      try {
        const response = await apiCall('/api/v1/conversations/stats');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        return {
          totalConversations: 0,
          publishedConversations: 0,
          featuredConversations: 0,
          totalLikes: 0,
          totalComments: 0,
          lastUpdated: new Date().toISOString()
        };
      }
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
      try {
        const response = await apiCall('/api/v1/conversations/categories');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        return ['Technology', 'Philosophy', 'Science'];
      }
    },
    getNextPageParam: () => undefined,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
