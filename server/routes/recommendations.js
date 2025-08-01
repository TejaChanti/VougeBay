const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Content-based recommendation
router.get("/content-based/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Find similar products in the same category, excluding the current product
    const recommendations = await Product.find({
      "category.main": product.category.main,
      _id: { $ne: product._id },
    }).limit(8);

    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
