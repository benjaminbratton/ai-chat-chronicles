import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

const CATEGORIES = [
  'Philosophy', 'Creative Writing', 'Programming', 'Science', 
  'Education', 'Business', 'Personal', 'Research'
];

const TAG_COMBINATIONS = {
  'Philosophy': ['Philosophy', 'Ethics', 'Consciousness', 'Logic', 'Metaphysics'],
  'Creative Writing': ['Creative Writing', 'Fiction', 'Poetry', 'Storytelling', 'Literature'],
  'Programming': ['Programming', 'JavaScript', 'Python', 'Web Development', 'AI'],
  'Science': ['Science', 'Physics', 'Biology', 'Chemistry', 'Research'],
  'Education': ['Education', 'Learning', 'Teaching', 'Pedagogy', 'Knowledge'],
  'Business': ['Business', 'Entrepreneurship', 'Marketing', 'Strategy', 'Innovation'],
  'Personal': ['Personal', 'Growth', 'Wellness', 'Productivity', 'Mindfulness'],
  'Research': ['Research', 'Data Analysis', 'Methodology', 'Academic', 'Study']
};

const generateRandomTags = (category: string): string[] => {
  const availableTags = TAG_COMBINATIONS[category as keyof typeof TAG_COMBINATIONS] || [category];
  const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 tags
  
  // Always include the main category
  const tags = new Set([category]);
  
  // Add random additional tags
  while (tags.size < Math.min(numTags, availableTags.length)) {
    const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
    tags.add(randomTag);
  }
  
  return Array.from(tags);
};

const SAMPLE_POST_TITLES = [
  "The Ethics of AI in Modern Society",
  "Exploring the Depths of Existentialism",
  "How to Write a Compelling Short Story",
  "The Science Behind Climate Change",
  "The Importance of Early Childhood Education",
  "Building a Successful Startup from Scratch",
  "The Art of Mindful Living",
  "The Latest Research in Quantum Physics",
  "The Future of Renewable Energy",
  "The Impact of Social Media on Mental Health"
];

export const useSyntheticData = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (count: number = 10) => {
      if (!user) {
        throw new Error('User must be authenticated to generate synthetic data');
      }

      console.log(`🎲 Generating ${count} synthetic conversations...`);

      const posts = [];
      for (let i = 0; i < count; i++) {
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const tags = generateRandomTags(category);
        
        const post = {
          title: `Synthetic Post ${i + 1}: ${category} Discussion`,
          content: `This is a synthetic conversation about ${category.toLowerCase()}. Generated for testing purposes with multiple tags: ${tags.join(', ')}.`,
          category,
          tags,
          author_id: user.id,
          published: true,
          featured: Math.random() > 0.8, // 20% chance of being featured
          read_time: Math.floor(Math.random() * 10) + 3,
          created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        
        posts.push(post);
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert(posts)
        .select();

      if (error) {
        console.error('❌ Error creating synthetic data:', error);
        throw error;
      }

      console.log(`✅ Successfully created ${data.length} synthetic conversations`);
      return data;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['available-tags'] });
      queryClient.invalidateQueries({ queryKey: ['featured-conversations'] });
    },
  });
};
