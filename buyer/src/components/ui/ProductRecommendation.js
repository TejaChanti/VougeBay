import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductRecommendation = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recommendations/content-based/${productId}`
        );
        setRecommendations(res.data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    if (productId) fetchRecommendations();
  }, [productId]);

  if (!recommendations.length) return null;

  return (
    <div className="recommendations-container p-4 bg-white rounded-lg mt-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Recommended Products
      </h3>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group block rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            {/* ✅ Consistent Image Size */}
            <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-white">
              {product.images?.[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* ✅ Product Info */}
            <div className="p-3 flex flex-col justify-between">
              <h4 className="text-sm md:text-base font-semibold text-gray-700 truncate">
                {product.name}
              </h4>
              <p className="text-md font-bold text-red-600 mt-1">
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendation;
