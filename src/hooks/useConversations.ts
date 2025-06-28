
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useConversations = (category?: string) => {
  return useQuery({
    queryKey: ['conversations', category],
    queryFn: async () => {
      console.log('Fetching conversations from Supabase...');
      
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

      // Only apply category filter if specified and not "All"
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }

      console.log('Successfully fetched conversations:', data?.length || 0);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window gains focus
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
          likes_count: 0,
          comments_count: 0,
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
