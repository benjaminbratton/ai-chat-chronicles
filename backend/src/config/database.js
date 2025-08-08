import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Mock Supabase client for demonstration
let supabase;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('Supabase credentials not found, using mock data for demonstration');
  
  // Create a mock Supabase client
  supabase = {
    from: (table) => ({
      select: (fields) => ({
        eq: (field, value) => ({
          single: () => Promise.resolve({ data: getMockData(table), error: null }),
          order: (field, options) => ({
            limit: (num) => Promise.resolve({ data: getMockData(table, num), error: null })
          })
        }),
        insert: (data) => ({
          select: (fields) => ({
            single: () => Promise.resolve({ data: { id: 'mock-id', ...data[0] }, error: null })
          })
        }),
        update: (data) => ({
          eq: (field, value) => ({
            select: (fields) => ({
              single: () => Promise.resolve({ data: { id: value, ...data }, error: null })
            })
          })
        }),
        delete: () => ({
          eq: (field, value) => Promise.resolve({ error: null })
        }),
        or: (query) => ({
          order: (field, options) => ({
            range: (start, end) => Promise.resolve({ 
              data: getMockData(table, end - start + 1), 
              error: null,
              count: 100
            })
          })
        }),
        order: (field, options) => ({
          range: (start, end) => Promise.resolve({ 
            data: getMockData(table, end - start + 1), 
            error: null,
            count: 100
          })
        }),
        range: (start, end) => Promise.resolve({ 
          data: getMockData(table, end - start + 1), 
          error: null,
          count: 100
        })
      }),
      auth: {
        getUser: (token) => Promise.resolve({ 
          data: { user: { id: 'mock-user-id', email: 'demo@example.com' } }, 
          error: null 
        }),
        signUp: (credentials) => Promise.resolve({ 
          data: { user: { id: 'mock-user-id', email: credentials.email } }, 
          error: null 
        }),
        signInWithPassword: (credentials) => Promise.resolve({ 
          data: { user: { id: 'mock-user-id', email: credentials.email } }, 
          error: null 
        }),
        signOut: () => Promise.resolve({ error: null }),
        admin: {
          deleteUser: (id) => Promise.resolve({ error: null })
        }
      }
    })
  };
} else {
  // Use real Supabase client
  supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Mock data generator
function getMockData(table, limit = 10) {
  const mockData = {
    conversations: Array.from({ length: limit }, (_, i) => ({
      id: `conv-${i + 1}`,
      title: `Mock Conversation ${i + 1}`,
      content: `This is mock content for conversation ${i + 1}. It contains some sample text to demonstrate the API functionality.`,
      excerpt: `Sample excerpt for conversation ${i + 1}`,
      author_id: 'mock-user-id',
      category: ['Philosophy', 'Technology', 'Science'][i % 3],
      read_time: Math.floor(Math.random() * 10) + 3,
      published: true,
      featured: i < 3,
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        id: 'mock-user-id',
        full_name: 'Demo User',
        username: 'demouser',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      likes_count: Math.floor(Math.random() * 50),
      comments_count: Math.floor(Math.random() * 20)
    })),
    profiles: Array.from({ length: limit }, (_, i) => ({
      id: `user-${i + 1}`,
      email: `user${i + 1}@example.com`,
      full_name: `User ${i + 1}`,
      username: `user${i + 1}`,
      title: `Title for User ${i + 1}`,
      bio: `Bio for User ${i + 1}`,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      location: 'Demo City',
      website: 'https://example.com',
      interests: ['Philosophy', 'Technology'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
  };

  return mockData[table] || [];
}

// Database types
export const DatabaseTypes = {
  Profile: {
    id: 'uuid',
    email: 'text',
    full_name: 'text',
    username: 'text',
    title: 'text',
    bio: 'text',
    avatar_url: 'text',
    location: 'text',
    website: 'text',
    interests: 'text[]',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },
  Conversation: {
    id: 'uuid',
    title: 'text',
    content: 'text',
    excerpt: 'text',
    author_id: 'uuid',
    category: 'text',
    read_time: 'integer',
    published: 'boolean',
    featured: 'boolean',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },
  Comment: {
    id: 'uuid',
    conversation_id: 'uuid',
    author_id: 'uuid',
    content: 'text',
    parent_id: 'uuid',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },
  Like: {
    id: 'uuid',
    user_id: 'uuid',
    conversation_id: 'uuid',
    comment_id: 'uuid',
    created_at: 'timestamp'
  },
  Follow: {
    id: 'uuid',
    follower_id: 'uuid',
    following_id: 'uuid',
    created_at: 'timestamp'
  },
  Seminar: {
    id: 'uuid',
    title: 'text',
    description: 'text',
    host_id: 'uuid',
    scheduled_at: 'timestamp',
    duration_minutes: 'integer',
    max_participants: 'integer',
    category: 'text',
    status: 'text',
    meeting_url: 'text',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  }
};

export { supabase };
export default supabase;
