
import { TrendingUp, Clock, BarChart3 } from "lucide-react";

interface SortOptionsProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export const SortOptions = ({ selectedSort, onSortChange }: SortOptionsProps) => {
  const sortOptions = [
    { value: "hot", label: "Hot", icon: TrendingUp },
    { value: "new", label: "New", icon: Clock },
    { value: "top", label: "Top", icon: BarChart3 }
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            selectedSort === option.value
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-black hover:bg-white/50"
          }`}
        >
          <option.icon className="w-4 h-4" />
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};
