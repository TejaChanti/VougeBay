import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { trackEvent } from "../utils/analytics"; // ✅ User behavior tracking
import ProductRecommendation from "../components/ui/ProductRecommendation"; // ✅ Recommendations

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch product and track view
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        // Track product view event
        trackEvent("product_view", {
          productId: res.data._id,
          productName: res.data.name,
          price: res.data.price,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ✅ Handle Add to Cart + Tracking
  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      toast.success("Product added to cart");

      // Track add-to-cart event
      trackEvent("add_to_cart", {
        productId: product._id,
        productName: product.name,
        quantity,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (!product || !product._id) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-[5rem] px-4">
      {/* ✅ Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="w-full max-w-xs md:max-w-md object-contain border rounded-md"
          />
        </div>

        {/* Product Info Section */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mb-4 text-lg">₹{product.price}</p>
          <p className="mb-4 text-gray-700">{product.description}</p>

          {/* Quantity + Button Row */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border rounded text-center py-1"
            />
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none px-4 py-2 rounded text-red-600 bg-white border border-red-500 font-medium hover:bg-red-50 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Product Recommendations Section */}
      <div className="mt-10">
        <ProductRecommendation productId={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
