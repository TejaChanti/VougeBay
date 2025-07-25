const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth, roleCheck } = require("../middleware/auth");

// Buyer: Place New Order
router.post("/", auth, roleCheck(["buyer"]), async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user.id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ msg: "Cart is empty" });

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const sellerId = cart.items[0].product.seller; // Assuming 1 seller per cart

    const order = new Order({
      buyer: req.user.id,
      seller: sellerId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total,
    });

    await order.save();
    await Cart.findOneAndDelete({ buyer: req.user.id });

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to place order", error: error.message });
  }
});

// Buyer: View My Orders (Sorted by Latest First)
router.get("/my", auth, roleCheck(["buyer"]), async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .sort({ createdAt: -1 }) // ✅ Sort by latest
      .populate("items.product")
      .populate("seller", "username");

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to fetch orders", error: error.message });
  }
});

// Seller: View Orders Received for Seller's Products
router.get(
  "/seller",
  auth,
  roleCheck(["seller", "admin"]),
  async (req, res) => {
    try {
      const orders = await Order.find({ seller: req.user.id })
        .sort({ createdAt: -1 }) // ✅ Sort by latest
        .populate("items.product")
        .populate("buyer", "username");

      res.json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Failed to fetch orders", error: error.message });
    }
  }
);

// Admin: View All Orders
router.get("/", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // ✅ Sort by latest
      .populate("items.product")
      .populate("buyer", "username")
      .populate("seller", "username");

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to fetch all orders", error: error.message });
  }
});

// Seller: Update Order Status
router.put("/:id", auth, roleCheck(["seller", "admin"]), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (req.user.role !== "admin" && order.seller.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this order" });
    }

    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to update order", error: error.message });
  }
});

// Admin: Delete Order
router.delete("/:id", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    await order.deleteOne();
    res.json({ msg: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to delete order", error: error.message });
  }
});

module.exports = router;
