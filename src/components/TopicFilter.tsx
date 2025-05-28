
import { Button } from '@/components/ui/button';

interface TopicFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TopicFilter = ({ selectedFilter, onFilterChange }: TopicFilterProps) => {
  const filters = [
    { value: 'all', label: 'All Topics', color: 'bg-gray-500' },
    { value: 'technology', label: 'Technology', color: 'bg-blue-500' },
    { value: 'philosophy', label: 'Philosophy', color: 'bg-purple-500' },
    { value: 'society', label: 'Society', color: 'bg-green-500' },
    { value: 'economics', label: 'Economics', color: 'bg-yellow-500' },
    { value: 'environment', label: 'Environment', color: 'bg-cyan-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={selectedFilter === filter.value ? "default" : "outline"}
          className={`
            ${selectedFilter === filter.value 
              ? `${filter.color} text-white border-transparent hover:opacity-90` 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
            transition-all duration-200
          `}
        >
          <div className={`w-2 h-2 rounded-full ${filter.color} mr-2`}></div>
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
