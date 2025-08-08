const API_BASE = 'http://localhost:3001';

// Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_id: string;
  category: string;
  read_time: number;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  likes_count?: number;
  comments_count?: number;
}

export interface Comment {
  id: string;
  conversation_id: string;
  author_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  replies?: Comment[];
}

export interface Like {
  id: string;
  user_id: string;
  conversation_id?: string;
  comment_id?: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Seminar {
  id: string;
  title: string;
  description: string;
  host_id: string;
  scheduled_at: string;
  duration_minutes: number;
  max_participants?: number;
  category: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  meeting_url?: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  participants_count?: number;
}

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  conversations: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Helper function for API calls with better error handling
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    // Return a fallback response instead of throwing
    throw error;
  }
}

// Auth API
export const authAPI = {
  // Admin login (for testing)
  adminLogin: async (email: string, password: string) => {
    try {
      return await apiCall<ApiResponse<{ user: Profile; token: string }>>('/api/v1/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error('Admin login failed:', error);
      throw new Error('Backend not available. Please ensure the backend server is running.');
    }
  },

  // Get admin profile
  getAdminProfile: async (token: string) => {
    try {
      return await apiCall<ApiResponse<{ user: Profile }>>('/api/v1/auth/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Get admin profile failed:', error);
      throw new Error('Failed to verify authentication token.');
    }
  },

  // Mock user login (for frontend testing)
  mockLogin: async (email: string, password: string) => {
    try {
      // For now, we'll use the admin credentials for testing
      if (email === 'admin@aichatchronicles.com' && password === 'admin123') {
        const response = await authAPI.adminLogin(email, password);
        return {
          user: response.data.user,
          session: { access_token: response.data.token },
          token: response.data.token,
        };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Mock login failed:', error);
      throw error;
    }
  },
};

// Conversations API
export const conversationsAPI = {
  // Get all conversations
  getConversations: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.category) searchParams.append('category', params.category);
      if (params?.search) searchParams.append('search', params.search);

      const endpoint = `/api/v1/conversations${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      return await apiCall<ApiResponse<Conversation[]>>(endpoint);
    } catch (error) {
      console.error('Get conversations failed:', error);
      // Return empty data instead of throwing
      return { success: true, data: [] };
    }
  },

  // Get featured conversations
  getFeaturedConversations: async () => {
    try {
      return await apiCall<ApiResponse<Conversation[]>>('/api/v1/conversations/featured');
    } catch (error) {
      console.error('Get featured conversations failed:', error);
      return { success: true, data: [] };
    }
  },

  // Get conversation by ID
  getConversationById: async (id: string) => {
    try {
      return await apiCall<ApiResponse<Conversation>>(`/api/v1/conversations/${id}`);
    } catch (error) {
      console.error('Get conversation by ID failed:', error);
      throw new Error('Failed to fetch conversation');
    }
  },

  // Create conversation (admin only)
  createConversation: async (conversationData: Partial<Conversation>, token: string) => {
    try {
      return await apiCall<ApiResponse<Conversation>>('/api/v1/conversations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(conversationData),
      });
    } catch (error) {
      console.error('Create conversation failed:', error);
      throw new Error('Failed to create conversation. Please ensure you are logged in and the backend is available.');
    }
  },

  // Update conversation (admin only)
  updateConversation: async (id: string, updates: Partial<Conversation>, token: string) => {
    try {
      return await apiCall<ApiResponse<Conversation>>(`/api/v1/conversations/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('Update conversation failed:', error);
      throw new Error('Failed to update conversation');
    }
  },

  // Delete conversation (admin only)
  deleteConversation: async (id: string, token: string) => {
    try {
      return await apiCall<ApiResponse<{ message: string }>>(`/api/v1/conversations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Delete conversation failed:', error);
      throw new Error('Failed to delete conversation');
    }
  },

  // Toggle featured status (admin only)
  toggleFeatured: async (id: string, featured: boolean, token: string) => {
    try {
      return await apiCall<ApiResponse<Conversation>>(`/api/v1/conversations/${id}/featured`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ featured }),
      });
    } catch (error) {
      console.error('Toggle featured failed:', error);
      throw new Error('Failed to toggle featured status');
    }
  },

  // Get conversation statistics
  getStats: async () => {
    try {
      return await apiCall<ApiResponse<{
        totalConversations: number;
        publishedConversations: number;
        featuredConversations: number;
        totalLikes: number;
        totalComments: number;
        lastUpdated: string;
      }>>('/api/v1/conversations/stats');
    } catch (error) {
      console.error('Get stats failed:', error);
      return { 
        success: true, 
        data: {
          totalConversations: 0,
          publishedConversations: 0,
          featuredConversations: 0,
          totalLikes: 0,
          totalComments: 0,
          lastUpdated: new Date().toISOString()
        }
      };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      return await apiCall<ApiResponse<string[]>>('/api/v1/conversations/categories');
    } catch (error) {
      console.error('Get categories failed:', error);
      return { success: true, data: ['Technology', 'Philosophy', 'Science'] };
    }
  },

  // Search conversations
  searchConversations: async (query: string) => {
    try {
      return await apiCall<ApiResponse<Conversation[]>>(`/api/v1/conversations/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search conversations failed:', error);
      return { success: true, data: [] };
    }
  },
};

// Health check
export const healthAPI = {
  checkHealth: async () => {
    try {
      return await apiCall<{
        status: string;
        timestamp: string;
        uptime: number;
        environment: string;
        version: string;
      }>('/health');
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend server is not available');
    }
  },
};

// Export the API base URL for other uses
export { API_BASE };
