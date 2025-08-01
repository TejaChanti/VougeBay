import { useEffect, useState } from "react";
import axios from "axios";
import FilterSortBar from "../components/ui/FilterSortBar";
import ProductCard from "../components/ui/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchFilteredProducts = async (
    category = "",
    sort = "",
    keyword = ""
  ) => {
    try {
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (sort) {
        params.append("sortBy", "price");
        params.append("order", sort);
      }
      if (keyword) params.append("keyword", keyword);

      const res = await axios.get(
        `http://localhost:5000/api/products/filter?${params.toString()}`
      );

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  return (
    <div className="mt-[8.5rem]">
      <FilterSortBar onFilterAndSort={fetchFilteredProducts} />

      {/* Responsive Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}

        {products.map((product) => (
          <div key={product._id} className="flex">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
