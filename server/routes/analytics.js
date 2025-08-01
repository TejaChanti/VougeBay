const express = require("express");
const router = express.Router();
const UserEvent = require("../models/UserEvent");
const { auth } = require("../middleware/auth");

router.post("/track-event", auth, async (req, res) => {
  try {
    const { eventType, eventData } = req.body;
    const userId = req.user ? req.user.id : null;

    const newEvent = new UserEvent({ userId, eventType, eventData });
    await newEvent.save();

    res.status(200).json({ msg: "Event tracked successfully" });
  } catch (err) {
    console.error("Error tracking event:", err);
    res.status(500).send("Failed to track event");
  }
});

module.exports = router;
