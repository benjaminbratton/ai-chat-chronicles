
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useAvailableTags = () => {
  return useQuery({
    queryKey: ['available-tags'],
    queryFn: async () => {
      console.log('🏷️ Fetching available tags...');
      
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('tags')
          .eq('published', true);

        if (error) {
          console.error('❌ Error fetching tags:', error);
          throw error;
        }

        // Flatten all tags and get unique values
        const allTags = data
          .flatMap(item => item.tags || [])
          .filter(Boolean);
        
        const uniqueTags = [...new Set(allTags)].sort();
        
        console.log('✅ Available tags:', uniqueTags);
        return uniqueTags;
      } catch (error) {
        console.error('💥 Tags query failed:', error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
