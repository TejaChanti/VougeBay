import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    fetchCart();
  };

  const handleClear = async () => {
    await axios.delete("http://localhost:5000/api/cart/clear", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    fetchCart();
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      navigate("/orders");
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart?.items?.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-lg">{item.product.name}</h2>
                  <p className="text-gray-500">
                    ₹{item.product.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 rounded text-green-600 bg-white-500 border border-green-500 font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
