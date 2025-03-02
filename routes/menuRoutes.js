const express = require("express");
const MenuItem = require("../models/menuItemModel");
const router = express.Router();

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    console.log("Received request:", req.body); // Debugging log

    const { name, price, description, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    const newItem = new MenuItem({ name, price, description, image });
    await newItem.save();

    console.log("Item added successfully:", newItem); // Debugging log

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get a single menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;