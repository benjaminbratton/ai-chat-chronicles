
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useConversations = (category?: string) => {
  return useQuery({
    queryKey: ['conversations', category],
    queryFn: async () => {
      console.log('🔍 Fetching conversations from Supabase...');
      
      try {
        let query = supabase
          .from('conversations')
          .select(`
            id,
            title,
            content,
            category,
            published,
            created_at,
            updated_at,
            author_id,
            read_time,
            profiles!conversations_author_id_fkey (
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
          console.log('🏷️ Filtering by category:', category);
          query = query.eq('category', category);
        } else {
          console.log('🌟 Fetching all categories');
        }

        console.log('🚀 Executing query...');
        const { data, error } = await query;

        if (error) {
          console.error('❌ Error fetching conversations:', error);
          throw error;
        }

        console.log('✅ Successfully fetched conversations:', data?.length || 0);
        console.log('📄 Sample data:', data?.slice(0, 2));
        return data || [];
      } catch (error) {
        console.error('💥 Query failed:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid loops
    retry: 1, // Only retry once
    retryDelay: 1000, // Wait 1 second between retries
    enabled: true, // Ensure query is enabled
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
