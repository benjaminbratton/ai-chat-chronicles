

import { Button } from '@/components/ui/button';

interface TopicFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TopicFilter = ({ selectedFilter, onFilterChange }: TopicFilterProps) => {
  const filters = [
    { value: 'all', label: 'All Topics', color: 'bg-gray-400' },
    { value: 'technology', label: 'Technology', color: 'bg-blue-300' },
    { value: 'philosophy', label: 'Philosophy', color: 'bg-purple-300' },
    { value: 'society', label: 'Society', color: 'bg-green-300' },
    { value: 'economics', label: 'Economics', color: 'bg-yellow-300' },
    { value: 'environment', label: 'Environment', color: 'bg-cyan-300' },
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
              ? `${filter.color} text-gray-700 border-transparent hover:opacity-90` 
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

