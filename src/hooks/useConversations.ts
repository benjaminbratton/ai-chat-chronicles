
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useConversations = (category?: string, limit: number = 12, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ['conversations', category, limit, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching conversations from database...', { category, page: pageParam + 1, limit, searchQuery });
      
      let query = supabase
        .from('conversations')
        .select(`
          id,
          title,
          content,
          excerpt,
          category,
          published,
          created_at,
          updated_at,
          author_id,
          read_time,
          featured,
          profiles!conversations_author_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      // Apply category filter if specified and not "All"
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      // Apply search filter if provided
      if (searchQuery && searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
      }

      // Get total count for pagination
      const countQuery = supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      if (category && category !== 'All') {
        countQuery.eq('category', category);
      }

      if (searchQuery && searchQuery.trim()) {
        countQuery.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
      }

      const { count } = await countQuery;

      // Apply pagination
      const startIndex = pageParam * limit;
      query = query.range(startIndex, startIndex + limit - 1);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching conversations:', error);
        throw new Error(`Failed to fetch conversations: ${error.message}`);
      }

      const conversations = data || [];
      const total = count || 0;
      const hasNextPage = startIndex + limit < total;

      console.log(`Fetched ${conversations.length} conversations, total: ${total}`);

      return {
        conversations,
        total,
        page: pageParam + 1,
        limit,
        hasNextPage,
        hasPreviousPage: pageParam > 0
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationData: any) => {
      const { data, error } = await supabase
        .from('conversations')
        .insert([conversationData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create conversation: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
