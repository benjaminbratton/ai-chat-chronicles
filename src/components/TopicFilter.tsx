
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';

interface TopicFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TopicFilter = ({ selectedFilter, onFilterChange }: TopicFilterProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/conversations');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error('Failed to fetch categories');
        }

        // Get unique categories from the conversations
        const uniqueCategories = [...new Set(result.data.map((item: any) => item.category))];
        return uniqueCategories.sort();
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        return ['Philosophy', 'Technology', 'Science', 'Creative Writing', 'Programming', 'Education', 'Business', 'Personal', 'Research', 'Healthcare'];
      }
    },
  });

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">Filter by:</span>
      <Select value={selectedFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48 bg-white border-gray-300">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Topics</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
