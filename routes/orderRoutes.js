const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();

// 📌 Place a New Order
router.post("/", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { name, phone, email, address, items, totalAmount } = req.body;

    // ✅ Ensure all required fields are present
    if (!name || !phone || !email || !address || !items || items.length === 0) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "Name, phone, email, address, and items are required" });
    }

    const newOrder = new Order({ name, phone, email, address, items, totalAmount });
    await newOrder.save();

    console.log("Order successfully saved:", newOrder);
    res.status(201).json({ success: true, message: "Order placed!", order: newOrder });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
