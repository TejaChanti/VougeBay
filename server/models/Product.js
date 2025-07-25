const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    brand: { type: String },
    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    stock: { type: Number, default: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sku: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
