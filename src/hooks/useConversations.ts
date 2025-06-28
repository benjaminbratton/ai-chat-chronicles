
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock data for when Supabase isn't available
const mockConversations = [
  {
    id: '1',
    title: 'The Future of AI Consciousness',
    content: 'Exploring the philosophical implications of artificial intelligence developing consciousness and what it means for humanity.',
    category: 'Philosophy',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: 'mock-user-1',
    read_time: 8,
    profiles: {
      id: 'mock-user-1',
      full_name: 'Dr. Sarah Chen',
      username: 'sarahchen',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '2',
    title: 'Machine Learning Ethics in Healthcare',
    content: 'A deep dive into the ethical considerations when implementing AI systems in medical diagnosis and treatment.',
    category: 'Ethics',
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    author_id: 'mock-user-2',
    read_time: 12,
    profiles: {
      id: 'mock-user-2',
      full_name: 'Marcus Rodriguez',
      username: 'marcusr',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '3',
    title: 'Quantum Computing and AI Convergence',
    content: 'How quantum computing might revolutionize artificial intelligence and accelerate machine learning capabilities.',
    category: 'Technology',
    published: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    author_id: 'mock-user-3',
    read_time: 6,
    profiles: {
      id: 'mock-user-3',
      full_name: 'Alex Kim',
      username: 'alexk',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  }
];

export const useConversations = (category?: string) => {
  return useQuery({
    queryKey: ['conversations', category],
    queryFn: async () => {
      // Return mock data immediately to prevent hanging
      console.log('🔍 Using mock conversations data');
      
      let filteredData = mockConversations;
      
      // Apply category filter if specified and not "All"
      if (category && category !== 'All') {
        filteredData = mockConversations.filter(conv => conv.category === category);
      }
      
      console.log('✅ Returning conversations:', filteredData.length);
      return filteredData;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
    enabled: true,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationData: any) => {
      console.log('Creating conversation:', conversationData);
      
      // Mock creation - just return the data with an ID
      const newConversation = {
        ...conversationData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published: true,
      };

      console.log('Successfully created conversation:', newConversation);
      return newConversation;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
