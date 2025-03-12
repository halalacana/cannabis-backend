const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();

// 📌 Get all orders (Admin Panel)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📌 Place a New Order (Customer)
router.post("/", async (req, res) => {
  try {
    console.log("Received order request:", req.body);

    const { name, phone, address, items, totalAmount } = req.body;

    if (!name || !phone || !address || !items || items.length === 0) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newOrder = new Order({ name, phone, address, items, totalAmount });
    await newOrder.save();

    console.log("Order successfully saved:", newOrder);
    res.status(201).json({ success: true, message: "Order placed!", order: newOrder });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
