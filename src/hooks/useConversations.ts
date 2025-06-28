
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Conversation } from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useConversations = (category?: string, featured?: boolean) => {
  return useQuery({
    queryKey: ['conversations', category, featured],
    queryFn: async () => {
      let query = supabase
        .from('conversations')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (featured) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Get likes and comments count for each conversation
      const conversationsWithCounts = await Promise.all(
        data.map(async (conversation) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('likes')
              .select('id')
              .eq('conversation_id', conversation.id),
            supabase
              .from('comments')
              .select('id')
              .eq('conversation_id', conversation.id)
          ]);

          return {
            ...conversation,
            likes_count: likesResult.data?.length || 0,
            comments_count: commentsResult.data?.length || 0,
          };
        })
      );

      return conversationsWithCounts as Conversation[];
    },
  });
};

export const useConversation = (id: string) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            username,
            avatar_url,
            title,
            bio
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Get likes and comments count
      const [likesResult, commentsResult] = await Promise.all([
        supabase
          .from('likes')
          .select('id')
          .eq('conversation_id', id),
        supabase
          .from('comments')
          .select('id')
          .eq('conversation_id', id)
      ]);

      return {
        ...data,
        likes_count: likesResult.data?.length || 0,
        comments_count: commentsResult.data?.length || 0,
      } as Conversation;
    },
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (conversation: Omit<Conversation, 'id' | 'author_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('conversations')
        .insert([
          {
            ...conversation,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useUpdateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Conversation> }) => {
      const { data, error } = await supabase
        .from('conversations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', data.id] });
    },
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
