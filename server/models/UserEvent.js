const mongoose = require("mongoose");

const UserEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventType: { type: String, required: true }, // e.g. product_view
  eventData: { type: Map, of: mongoose.Schema.Types.Mixed }, // Flexible event details
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserEvent", UserEventSchema);
