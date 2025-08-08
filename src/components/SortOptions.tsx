
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
    <div className="flex items-center space-x-1 bg-bg-2 rounded-md p-1 border border-border">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            selectedSort === option.value
              ? "bg-accent text-bg-0 shadow-sm"
              : "text-text-1 hover:text-text-0 hover:bg-bg-1"
          }`}
        >
          <option.icon className="w-4 h-4" />
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};
