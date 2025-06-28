
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useFeaturedConversations = (limit: number = 3) => {
  return useQuery({
    queryKey: ['featured-conversations', limit],
    queryFn: async () => {
      console.log('Fetching featured conversations...');
      
      const { data, error } = await supabase
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
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured conversations:', error);
        throw error;
      }

      // If no featured posts, get recent ones
      if (!data || data.length === 0) {
        const { data: recentData, error: recentError } = await supabase
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
          .order('created_at', { ascending: false })
          .limit(limit);

        if (recentError) throw recentError;
        return recentData || [];
      }

      return data;
    },
  });
};
