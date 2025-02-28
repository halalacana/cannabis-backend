const express = require('express');
const MenuItem = require('../models/menuItemModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json({ message: '✅ Menu item added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;