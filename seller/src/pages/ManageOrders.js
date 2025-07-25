import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/seller", {
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFromDate("");
    setToDate("");
  };

  const filteredOrders = orders.filter((order) => {
    const searchMatch = [order.buyer?.username, order.status, order._id]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "All" || order.status === statusFilter;

    const orderDate = dayjs(order.createdAt);
    const fromMatch = fromDate
      ? orderDate.isAfter(dayjs(fromDate).subtract(1, "day"))
      : true;
    const toMatch = toDate
      ? orderDate.isBefore(dayjs(toDate).add(1, "day"))
      : true;

    return searchMatch && statusMatch && fromMatch && toMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 h-[calc(100vh-4rem)] flex flex-col">
      <div className="sticky top-0 bg-white z-10 py-4 space-y-2">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by buyer, order ID, or status..."
          className="w-full border p-2 rounded-md shadow-sm outline-none"
        />

        <div className="flex flex-wrap items-center gap-4 mt-2 text-grey-300">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={clearFilters}
            className="px-2 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-bold">Manage Orders</h1>
          <span className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
      </div>

      <div className="overflow-y-auto mt-4 space-y-4 pr-1 flex-1">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <p className="text-gray-500">
                Buyer: {order.buyer?.username || "N/A"}
              </p>
              <p className="text-gray-500">
                Status:
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="ml-2 border rounded p-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </p>
              <p className="text-gray-500">
                Created At: {dayjs(order.createdAt).format("DD MMM YYYY")}
              </p>
              <p className="text-gray-500">Total: ₹{order.total}</p>

              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.product?._id || Math.random()}
                    className="flex justify-between text-sm"
                  >
                    <div>{item.product?.name}</div>
                    <div>Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
