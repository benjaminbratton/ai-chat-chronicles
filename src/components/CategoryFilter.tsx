
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

const categories = [
  "All",
  "Philosophy", 
  "Creative Writing",
  "Programming",
  "Science",
  "Education",
  "Business",
  "Personal"
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange, excludeAll = false }: CategoryFilterProps) => {
  const filteredCategories = excludeAll ? categories.filter(cat => cat !== "All") : categories;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
