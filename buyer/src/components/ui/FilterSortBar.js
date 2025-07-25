import { useState } from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { label: "All", value: "" },
  { label: "Electronics", value: "Electronics" },
  { label: "Beauty", value: "Beauty" },
];

const FilterSortBar = ({ onFilterAndSort }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    onFilterAndSort(value, selectedSort);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSelectedSort(sortValue);
    onFilterAndSort(selectedCategory, sortValue);
  };
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterAndSort(selectedCategory, selectedSort, term);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b shadow px-4 py-3 flex flex-wrap justify-between items-center gap-4">
      <div className="space-x-4">
        {categories.map((cat) => (
          <NavLink
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className={`px-4 py-1 ${
              selectedCategory === cat.value
                ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-400 ease-in-out"
                : "text-gray-700"
            }`}
          >
            {cat.label}
          </NavLink>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search by name, brand, category..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-3 py-2 border rounded outline-none text-sm w-[40%]"
      />
      <select
        value={selectedSort}
        onChange={handleSortChange}
        className="px-3 py-2 rounded text-sm outline-none"
      >
        <option value="">Sort By</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterSortBar;
