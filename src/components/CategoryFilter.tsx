
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

const categories = [
  { name: "All", color: "bg-gray-600" },
  { name: "Philosophy", color: "bg-purple-500" }, 
  { name: "Creative Writing", color: "bg-pink-500" },
  { name: "Programming", color: "bg-blue-500" },
  { name: "Science", color: "bg-green-500" },
  { name: "Education", color: "bg-yellow-500" },
  { name: "Business", color: "bg-orange-500" },
  { name: "Personal", color: "bg-indigo-500" }
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange, excludeAll = false }: CategoryFilterProps) => {
  const filteredCategories = excludeAll ? categories.filter(cat => cat.name !== "All") : categories;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredCategories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`group relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.name
                ? `bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border border-blue-400/50`
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border-2 border-gray-600/50 hover:border-gray-500/50 shadow-md hover:shadow-lg backdrop-blur-sm"
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="relative z-10">{category.name}</span>
            {selectedCategory !== category.name && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
