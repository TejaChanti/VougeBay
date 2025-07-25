import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: quantity,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      //console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-[5rem]">
      <div className="flex gap-8">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-96 h-96 object-cover border"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mb-4">₹{product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border rounded text-center"
            />
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
