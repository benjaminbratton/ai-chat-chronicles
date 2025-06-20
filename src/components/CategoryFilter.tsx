

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

const categories = [
  { name: "All", color: "bg-gray-400" },
  { name: "Philosophy", color: "bg-purple-300" }, 
  { name: "Creative Writing", color: "bg-pink-300" },
  { name: "Programming", color: "bg-blue-300" },
  { name: "Science", color: "bg-green-300" },
  { name: "Education", color: "bg-yellow-300" },
  { name: "Business", color: "bg-orange-300" },
  { name: "Personal", color: "bg-indigo-300" }
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
                ? `bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg`
                : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="relative z-10">{category.name}</span>
            {selectedCategory !== category.name && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
