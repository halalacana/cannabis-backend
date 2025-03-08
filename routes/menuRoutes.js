const express = require("express");
const MenuItem = require("../models/menuItemModel");
const router = express.Router();

// 📌 Get all menu items
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📌 Add a new menu item
router.post("/", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding item" });
  }
});

// 📌 Delete a menu item
router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
});

module.exports = router;
