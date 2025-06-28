
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface TopicFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TopicFilter = ({ selectedFilter, onFilterChange }: TopicFilterProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('category')
        .eq('published', true);

      if (error) throw error;

      // Get unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      return uniqueCategories.sort();
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
