
import { useQuery } from '@tanstack/react-query';
import { useConversations } from './useConversations';

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
  // Use the same conversations data as the explore page
  const { data: conversationsData } = useConversations(filter === 'all' ? undefined : filter, 1, 1000);
  
  return useQuery({
    queryKey: ['visualization-data', filter],
    queryFn: () => {
      console.log('Fetching visualization data for filter:', filter);
      
      const conversations = conversationsData?.conversations || [];
      
      console.log('Fetched conversations for visualization:', conversations.length);

      if (conversations.length === 0) {
        return { nodes: [], links: [] };
      }

      // Process conversations to create nodes and links
      const categoryMap = new Map<string, { count: number, connections: Set<string> }>();
      const topics = new Set<string>();

      // Extract categories and topics from conversations
      conversations.forEach(conversation => {
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

        // Extract key topics from titles (improved word extraction)
        words.forEach(word => {
          const cleanWord = word.replace(/[^\w]/g, '');
          if (cleanWord.length > 4 && !['with', 'about', 'from', 'this', 'that', 'they', 'them', 'have', 'will', 'been', 'what', 'when', 'where', 'through', 'using', 'building', 'creating'].includes(cleanWord)) {
            topics.add(cleanWord);
            // Connect topics to categories
            categoryMap.get(category)?.connections.add(cleanWord);
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
          size: Math.max(20, Math.min(40, data.count * 4)),
          connections: data.connections.size
        });
      });

      // Add topic nodes (top 15 most common)
      const topicCounts = new Map<string, number>();
      conversations.forEach(conversation => {
        const words = conversation.title.toLowerCase().split(' ');
        words.forEach(word => {
          const cleanWord = word.replace(/[^\w]/g, '');
          if (cleanWord.length > 4 && !['with', 'about', 'from', 'this', 'that', 'they', 'them', 'have', 'will', 'been', 'what', 'when', 'where', 'through', 'using', 'building', 'creating'].includes(cleanWord)) {
            topicCounts.set(cleanWord, (topicCounts.get(cleanWord) || 0) + 1);
          }
        });
      });

      const sortedTopics = Array.from(topicCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

      console.log('Top topics:', sortedTopics);

      sortedTopics.forEach(([topic, count]) => {
        nodes.push({
          id: `topic-${topic}`,
          label: topic.charAt(0).toUpperCase() + topic.slice(1),
          category: 'Topic',
          size: Math.max(12, Math.min(30, count * 3)),
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
              strength: Math.min(1, (topicCounts.get(topic) || 1) / 3)
            });
          }
        });
      });

      // Add some connections between related topics for visual interest
      for (let i = 0; i < sortedTopics.length - 1; i++) {
        for (let j = i + 1; j < sortedTopics.length; j++) {
          if (Math.random() > 0.8) { // 20% chance of connection
            links.push({
              source: `topic-${sortedTopics[i][0]}`,
              target: `topic-${sortedTopics[j][0]}`,
              strength: Math.random() * 0.4
            });
          }
        }
      }

      console.log('Generated visualization data:', { nodes: nodes.length, links: links.length });
      return { nodes, links };
    },
    enabled: !!conversationsData, // Only run when we have conversations data
  });
};
