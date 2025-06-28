
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useConversations = (category?: string) => {
  return useQuery({
    queryKey: ['conversations', category],
    queryFn: async () => {
      console.log('Starting to fetch conversations...');
      console.log('Category:', category);
      
      try {
        // First, let's test if we can connect to Supabase at all
        console.log('Testing Supabase connection...');
        
        // Very simple query first
        const { data: testData, error: testError } = await supabase
          .from('conversations')
          .select('id')
          .limit(1);
          
        console.log('Test query result:', { testData, testError });
        
        if (testError) {
          console.error('Supabase connection failed:', testError);
          return [];
        }
        
        // Now try the full query
        console.log('Executing full query...');
        let query = supabase
          .from('conversations')
          .select('id, title, content, category, published, created_at, updated_at, author_id, read_time')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(20);

        if (category && category !== 'All') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        
        console.log('Full query result:', { data: data?.length, error });

        if (error) {
          console.error('Query error:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Catch block error:', error);
        return [];
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
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
