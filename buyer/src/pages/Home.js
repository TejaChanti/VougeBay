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

      console.log("Query:", `/filter?${params.toString()}`);
      console.log("Products:", res.data.products);

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
      <div className="p-4 grid md:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
