const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false }, // ✅ Ensure email is NOT required
  address: { type: String, required: true },
  items: [{ 
    name: String, 
    price: Number, 
    quantity: Number 
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
