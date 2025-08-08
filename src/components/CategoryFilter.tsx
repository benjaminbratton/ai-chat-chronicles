
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

export const categories = [
  { name: "All", color: "backdrop-blur-md bg-gradient-to-r from-gray-600/30 to-gray-700/30 border border-gray-500/30", textColor: "text-white" },
  { name: "Philosophy", color: "backdrop-blur-md bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30", textColor: "text-white" }, 
  { name: "Creative Writing", color: "backdrop-blur-md bg-gradient-to-r from-pink-600/30 to-pink-700/30 border border-pink-500/30", textColor: "text-white" },
  { name: "Programming", color: "backdrop-blur-md bg-gradient-to-r from-blue-600/30 to-blue-700/30 border border-blue-500/30", textColor: "text-white" },
  { name: "Technology", color: "backdrop-blur-md bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 border border-cyan-500/30", textColor: "text-white" },
  { name: "Science", color: "backdrop-blur-md bg-gradient-to-r from-green-600/30 to-green-700/30 border border-green-500/30", textColor: "text-white" },
  { name: "Education", color: "backdrop-blur-md bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 border border-yellow-500/30", textColor: "text-black" },
  { name: "Business", color: "backdrop-blur-md bg-gradient-to-r from-orange-600/30 to-orange-700/30 border border-orange-500/30", textColor: "text-white" },
  { name: "Personal", color: "backdrop-blur-md bg-gradient-to-r from-indigo-600/30 to-indigo-700/30 border border-indigo-500/30", textColor: "text-white" },
  { name: "Research", color: "backdrop-blur-md bg-gradient-to-r from-teal-600/30 to-teal-700/30 border border-teal-500/30", textColor: "text-white" },
  { name: "Healthcare", color: "backdrop-blur-md bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/30", textColor: "text-white" }
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange, excludeAll = false }: CategoryFilterProps) => {
  const filteredCategories = excludeAll ? categories.filter(cat => cat.name !== "All") : categories;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category.color} ${category.textColor} ${
              selectedCategory === category.name
                ? "ring-2 ring-offset-2 ring-gray-400 shadow-lg scale-105"
                : "hover:shadow-md hover:scale-102 opacity-80 hover:opacity-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
