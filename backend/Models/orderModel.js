// backend/models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
