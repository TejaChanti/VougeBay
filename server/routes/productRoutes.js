const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth, roleCheck } = require("../middleware/auth");
const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/imageUploadController");

// Utility: Generate SKU
const generateSKU = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `VGBAY-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-${randomNum}`;
};

//
// 🔃 1. Upload Product Image
//
router.post(
  "/upload-image",
  auth,
  roleCheck(["seller", "admin"]),
  upload.single("image"),
  uploadImage
);

//
// 🆕 2. Create Product
//
router.post("/", auth, roleCheck(["seller", "admin"]), async (req, res) => {
  try {
    const sku = generateSKU();
    const product = new Product({
      ...req.body,
      sku,
      seller: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

//
// 👤 3. Get Seller's Own Products (sorted latest first)
//
router.get("/mine", auth, roleCheck(["seller", "admin"]), async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
      .sort({ createdAt: -1 }) // ✅ Sort latest first
      .populate("seller", "username");
    res.json(products);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//
// 🔍 4. Filter/Search Products (Keep before /:id)
//
router.get("/filter", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, keyword, sortBy, order } = req.query;

    let query = {};
    let sort = {};

    // 🔍 Keyword search: name, brand, category
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    // 🔘 Category filter
    if (category) {
      query.category = category;
    }

    // 💸 Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // ↕️ Sorting
    if (sortBy) {
      sort[sortBy] = order === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default to newest first
    }

    const products = await Product.find(query).sort(sort);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

//
// 🌍 5. Get All Products (Public)
//
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "username");
    res.json(products);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//
// 📦 6. Get Single Product by ID (After filter/mine)
//
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//
// ✏️ 7. Update Product
//
router.put("/:id", auth, roleCheck(["seller", "admin"]), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (
      req.user.role !== "admin" &&
      product.seller.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updatedData = { ...req.body };
    delete updatedData.sku;

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//
// ❌ 8. Delete Product
//
router.delete(
  "/:id",
  auth,
  roleCheck(["seller", "admin"]),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });

      if (
        req.user.role !== "admin" &&
        product.seller.toString() !== req.user.id
      ) {
        return res.status(403).json({ msg: "Not authorized" });
      }

      await product.deleteOne();
      res.json({ msg: "Product removed" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
