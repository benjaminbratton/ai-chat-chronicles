
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

const categories = [
  { name: "All", color: "bg-gray-500", textColor: "text-white" },
  { name: "Philosophy", color: "bg-purple-500", textColor: "text-white" }, 
  { name: "Creative Writing", color: "bg-pink-500", textColor: "text-white" },
  { name: "Programming", color: "bg-blue-500", textColor: "text-white" },
  { name: "Science", color: "bg-green-500", textColor: "text-white" },
  { name: "Education", color: "bg-yellow-500", textColor: "text-black" },
  { name: "Business", color: "bg-orange-500", textColor: "text-white" },
  { name: "Personal", color: "bg-indigo-500", textColor: "text-white" },
  { name: "Research", color: "bg-teal-500", textColor: "text-white" }
];

// Export categories for use in other components
export { categories };

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
                ? `${category.color} ${category.textColor}`
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
