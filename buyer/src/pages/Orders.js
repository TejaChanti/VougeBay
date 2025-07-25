import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <h2 className="font-semibold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <p className="text-gray-500">Status: {order.status}</p>
              <p className="text-gray-500">Total: ₹{order.total}</p>
              <div className="mt-2">
                {order.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-4 items-center my-2"
                  >
                    <img
                      src={item.product.images?.[0]?.url}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <h3>{item.product.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
