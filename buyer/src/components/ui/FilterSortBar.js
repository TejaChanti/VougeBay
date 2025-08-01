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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // ✅ Drawer state

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    onFilterAndSort(value, selectedSort, searchTerm);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSelectedSort(sortValue);
    onFilterAndSort(selectedCategory, sortValue, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterAndSort(selectedCategory, selectedSort, term);
  };

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b shadow px-4 py-3 hidden md:flex justify-between items-center gap-4">
        {/* Categories */}
        <div className="flex space-x-4">
          {categories.map((cat) => (
            <NavLink
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-4 py-1 ${
                selectedCategory === cat.value
                  ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-300 ease-in-out"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              {cat.label}
            </NavLink>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, brand, category..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 border rounded outline-none text-sm w-[40%]"
        />

        {/* Sort */}
        <select
          value={selectedSort}
          onChange={handleSortChange}
          className="px-3 py-2 rounded text-sm outline-none border"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b shadow px-4 py-2 flex justify-between items-center md:hidden">
        <span className="font-medium text-gray-700">Products</span>
        <button
          className="px-4 py-2 border border-red-400 text-red-600 rounded-md"
          onClick={() => setIsDrawerOpen(true)}
        >
          Filter & Sort
        </button>
      </div>

      {/* Mobile Top Drawer */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          isDrawerOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          <h2 className="text-lg font-bold text-gray-800">Filter & Sort</h2>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  selectedCategory === cat.value
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, brand, category..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-3 py-2 border rounded outline-none text-sm w-full"
          />

          {/* Sort + Apply Button Row */}
          <div className="flex items-center justify-space-between gap-6 w-full">
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="px-3 py-2 rounded text-sm outline-none border flex-1"
            >
              <option value="">Sort By</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 border border-red-400 text-red-600 rounded-md text-sm whitespace-nowrap"
            >
              Apply & Close
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
    </>
  );
};

export default FilterSortBar;
