

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
      <div className="flex flex-wrap gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.name
                ? `${category.color} text-gray-700`
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

