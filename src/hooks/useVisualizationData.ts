
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface VisualizationNode {
  id: string;
  label: string;
  category: string;
  size: number;
  connections: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface VisualizationLink {
  source: string;
  target: string;
  strength: number;
}

export const useVisualizationData = (filter: string) => {
  return useQuery({
    queryKey: ['visualization-data', filter],
    queryFn: async () => {
      // Fetch conversations from Supabase
      let query = supabase
        .from('conversations')
        .select('*')
        .eq('published', true);

      if (filter !== 'all') {
        query = query.eq('category', filter);
      }

      const { data: conversations, error } = await query;

      if (error) throw error;

      // Process conversations to create nodes and links
      const categoryMap = new Map<string, { count: number, connections: Set<string> }>();
      const topics = new Set<string>();

      // Extract categories and topics from conversations
      conversations?.forEach(conversation => {
        const category = conversation.category;
        const words = conversation.title.toLowerCase().split(' ');
        
        // Add category
        if (!categoryMap.has(category)) {
          categoryMap.set(category, { count: 0, connections: new Set() });
        }
        categoryMap.set(category, {
          count: categoryMap.get(category)!.count + 1,
          connections: categoryMap.get(category)!.connections
        });

        // Extract key topics from titles (simple word extraction)
        words.forEach(word => {
          if (word.length > 4 && !['with', 'about', 'from', 'this', 'that', 'they', 'them', 'have', 'will', 'been', 'what', 'when', 'where'].includes(word)) {
            topics.add(word);
            // Connect topics to categories
            categoryMap.get(category)?.connections.add(word);
          }
        });
      });

      // Create nodes
      const nodes: VisualizationNode[] = [];
      
      // Add category nodes
      categoryMap.forEach((data, category) => {
        nodes.push({
          id: `cat-${category}`,
          label: category,
          category: 'Category',
          size: Math.max(15, Math.min(35, data.count * 3)),
          connections: data.connections.size
        });
      });

      // Add topic nodes (top 10 most common)
      const topicCounts = new Map<string, number>();
      conversations?.forEach(conversation => {
        const words = conversation.title.toLowerCase().split(' ');
        words.forEach(word => {
          if (word.length > 4 && !['with', 'about', 'from', 'this', 'that', 'they', 'them', 'have', 'will', 'been', 'what', 'when', 'where'].includes(word)) {
            topicCounts.set(word, (topicCounts.get(word) || 0) + 1);
          }
        });
      });

      const sortedTopics = Array.from(topicCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      sortedTopics.forEach(([topic, count]) => {
        nodes.push({
          id: `topic-${topic}`,
          label: topic.charAt(0).toUpperCase() + topic.slice(1),
          category: 'Topic',
          size: Math.max(10, Math.min(25, count * 2)),
          connections: count
        });
      });

      // Create links between nodes
      const links: VisualizationLink[] = [];
      
      // Link categories to topics
      categoryMap.forEach((data, category) => {
        data.connections.forEach(topic => {
          if (topicCounts.has(topic)) {
            links.push({
              source: `cat-${category}`,
              target: `topic-${topic}`,
              strength: Math.min(1, (topicCounts.get(topic) || 1) / 5)
            });
          }
        });
      });

      // Add some random connections between topics for visual interest
      for (let i = 0; i < sortedTopics.length - 1; i++) {
        for (let j = i + 1; j < sortedTopics.length; j++) {
          if (Math.random() > 0.7) { // 30% chance of connection
            links.push({
              source: `topic-${sortedTopics[i][0]}`,
              target: `topic-${sortedTopics[j][0]}`,
              strength: Math.random() * 0.5
            });
          }
        }
      }

      return { nodes, links };
    },
  });
};
