import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useConversations = (category?: string) => {
  return useQuery({
    queryKey: ['conversations', category],
    queryFn: async () => {
      try {
        // Build a simple query first
        let query = supabase
          .from('conversations')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        // Only apply category filter if specified and not "All"
        if (category && category !== 'All') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching conversations:', error);
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error('Query failed:', error);
        throw error;
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    enabled: true,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationData: any) => {
      console.log('Creating conversation:', conversationData);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to create conversations');
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          ...conversationData,
          author_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        throw error;
      }

      console.log('Successfully created conversation:', data);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
