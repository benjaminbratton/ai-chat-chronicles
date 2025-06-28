import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock data for conversations
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
  },
  {
    id: '4',
    title: 'Building Sustainable AI Systems',
    content: 'Examining the environmental impact of large AI models and strategies for developing more energy-efficient systems.',
    category: 'Science',
    published: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    author_id: 'mock-user-4',
    read_time: 10,
    profiles: {
      id: 'mock-user-4',
      full_name: 'Dr. Elena Vasquez',
      username: 'elenaV',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '5',
    title: 'Creative AI in Digital Art',
    content: 'How artificial intelligence is transforming the creative process and challenging traditional notions of artistic authorship.',
    category: 'Creative Writing',
    published: true,
    created_at: new Date(Date.now() - 345600000).toISOString(),
    updated_at: new Date(Date.now() - 345600000).toISOString(),
    author_id: 'mock-user-5',
    read_time: 7,
    profiles: {
      id: 'mock-user-5',
      full_name: 'Jamie Foster',
      username: 'jfoster',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '6',
    title: 'AI in Education: Personalized Learning',
    content: 'Exploring how AI-powered educational tools can adapt to individual learning styles and improve student outcomes.',
    category: 'Education',
    published: true,
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date(Date.now() - 432000000).toISOString(),
    author_id: 'mock-user-6',
    read_time: 9,
    profiles: {
      id: 'mock-user-6',
      full_name: 'Prof. Michael Zhang',
      username: 'mzhang',
      avatar_url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '7',
    title: 'The Economics of AI Automation',
    content: 'Analyzing the economic implications of widespread AI adoption and its effects on employment and wealth distribution.',
    category: 'Business',
    published: true,
    created_at: new Date(Date.now() - 518400000).toISOString(),
    updated_at: new Date(Date.now() - 518400000).toISOString(),
    author_id: 'mock-user-7',
    read_time: 15,
    profiles: {
      id: 'mock-user-7',
      full_name: 'Dr. Rachel Thompson',
      username: 'rthompson',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '8',
    title: 'Neural Networks and Human Cognition',
    content: 'Comparing artificial neural networks with biological brain structures to understand intelligence and consciousness.',
    category: 'Science',
    published: true,
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 604800000).toISOString(),
    author_id: 'mock-user-8',
    read_time: 11,
    profiles: {
      id: 'mock-user-8',
      full_name: 'Dr. David Park',
      username: 'dpark',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '9',
    title: 'AI Safety and Alignment Research',
    content: 'Current approaches to ensuring AI systems remain beneficial and aligned with human values as they become more powerful.',
    category: 'Research',
    published: true,
    created_at: new Date(Date.now() - 691200000).toISOString(),
    updated_at: new Date(Date.now() - 691200000).toISOString(),
    author_id: 'mock-user-9',
    read_time: 13,
    profiles: {
      id: 'mock-user-9',
      full_name: 'Dr. Anna Kowalski',
      username: 'akowalski',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '10',
    title: 'My Journey with AI Creativity Tools',
    content: 'A personal reflection on how AI writing assistants have changed my creative process and writing habits.',
    category: 'Personal',
    published: true,
    created_at: new Date(Date.now() - 777600000).toISOString(),
    updated_at: new Date(Date.now() - 777600000).toISOString(),
    author_id: 'mock-user-10',
    read_time: 5,
    profiles: {
      id: 'mock-user-10',
      full_name: 'Sam Williams',
      username: 'swilliams',
      avatar_url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '11',
    title: 'Programming with AI Copilots',
    content: 'How AI coding assistants are changing software development practices and what it means for programmers.',
    category: 'Programming',
    published: true,
    created_at: new Date(Date.now() - 864000000).toISOString(),
    updated_at: new Date(Date.now() - 864000000).toISOString(),
    author_id: 'mock-user-11',
    read_time: 8,
    profiles: {
      id: 'mock-user-11',
      full_name: 'Alex Rivera',
      username: 'arivera',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '12',
    title: 'AI Ethics in Academic Research',
    content: 'Exploring the ethical frameworks needed for AI research in academic institutions and their real-world applications.',
    category: 'Philosophy',
    published: true,
    created_at: new Date(Date.now() - 950400000).toISOString(),
    updated_at: new Date(Date.now() - 950400000).toISOString(),
    author_id: 'mock-user-12',
    read_time: 14,
    profiles: {
      id: 'mock-user-12',
      full_name: 'Prof. Lisa Chen',
      username: 'lchen',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
    }
  }
];

export const useConversations = (category?: string, page: number = 1, limit: number = 12) => {
  return useQuery({
    queryKey: ['conversations', category, page, limit],
    queryFn: () => {
      // Return mock data synchronously - no async needed
      let filteredData = [...mockConversations];
      
      // Apply category filter if specified and not "All"
      if (category && category !== 'All') {
        filteredData = mockConversations.filter(conv => conv.category === category);
      }
      
      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      return {
        conversations: paginatedData,
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit),
        hasNextPage: endIndex < filteredData.length,
        hasPreviousPage: page > 1
      };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationData: any) => {
      // Mock creation - just return the data with an ID
      const newConversation = {
        ...conversationData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published: true,
      };

      return newConversation;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
