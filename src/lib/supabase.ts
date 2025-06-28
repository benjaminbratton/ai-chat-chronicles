
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
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
