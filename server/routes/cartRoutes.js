const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth, roleCheck } = require("../middleware/auth");

// Get Current Buyer's Cart
router.get("/", auth, roleCheck(["buyer"]), async (req, res) => {
  const cart = await Cart.findOne({ buyer: req.user.id }).populate(
    "items.product"
  );
  res.json(cart);
});

// Add Item to Cart
router.post("/add", auth, roleCheck(["buyer"]), async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ buyer: req.user.id });

  if (!cart) {
    cart = new Cart({ buyer: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Remove Item from Cart
router.delete(
  "/remove/:productId",
  auth,
  roleCheck(["buyer"]),
  async (req, res) => {
    let cart = await Cart.findOne({ buyer: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  }
);

// Clear Cart
router.delete("/clear", auth, roleCheck(["buyer"]), async (req, res) => {
  await Cart.findOneAndDelete({ buyer: req.user.id });
  res.json({ msg: "Cart cleared" });
});

module.exports = router;
