const express = require("express");
const MenuItem = require("../models/menuItemModel");
const router = express.Router();

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