
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useClearSyntheticData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      console.log('🧹 Starting to clear synthetic data...');
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      console.log('🗑️ Deleting all conversations for user:', user.id);

      // Delete all conversations for this user
      const { error: deleteError } = await supabase
        .from('conversations')
        .delete()
        .eq('author_id', user.id);

      if (deleteError) {
        console.error('❌ Error deleting conversations:', deleteError);
        throw new Error('Failed to delete conversations: ' + deleteError.message);
      }

      console.log('✅ Successfully cleared all synthetic data');
      return true;
    },
    onSuccess: () => {
      console.log('🔄 Invalidating queries to refresh data...');
      // Invalidate all related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['featured-conversations'] });
      queryClient.invalidateQueries({ queryKey: ['visualization-data'] });
      console.log('✅ Cache invalidated, data should refresh automatically');
    },
    onError: (error) => {
      console.error('💥 Failed to clear synthetic data:', error);
    }
  });
};
