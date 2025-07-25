import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get(
          "http://localhost:5000/api/products",
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );

        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        const sellerId = payload.id;

        const myProducts = productsRes.data.filter(
          (product) => product.seller && product.seller._id === sellerId
        );
        setProducts(myProducts);

        const ordersRes = await axios.get(
          "http://localhost:5000/api/orders/seller",
          {
            headers: { "x-auth-token": token },
          }
        );
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      }
    };

    fetchData();
  }, []);

  const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded shadow p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-4xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="border rounded shadow p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-4xl font-bold text-green-600">{orders.length}</p>
        </div>
        <div className="border rounded shadow p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-4xl font-bold text-purple-600">₹{totalSales}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
