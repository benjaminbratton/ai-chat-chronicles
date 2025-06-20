
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  excludeAll?: boolean;
}

const categories = [
  { name: "All" },
  { name: "Philosophy" }, 
  { name: "Creative Writing" },
  { name: "Programming" },
  { name: "Science" },
  { name: "Education" },
  { name: "Business" },
  { name: "Personal" }
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange, excludeAll = false }: CategoryFilterProps) => {
  const filteredCategories = excludeAll ? categories.filter(cat => cat.name !== "All") : categories;

  return (
    <div className="text-center">
      <div className="inline-flex flex-wrap gap-6 justify-center">
        {filteredCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`text-sm font-medium transition-colors ${
              selectedCategory === category.name
                ? "text-gray-900 border-b border-gray-900 pb-1"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
