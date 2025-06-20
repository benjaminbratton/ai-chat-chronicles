
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
