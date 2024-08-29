// backend/controllers/orderController.js

const Order = require('../Models/orderModel');
exports.createOrder = async (req, res) => {
  try {
    const { name, address, contactNumber } = req.body;

    if (!name || !address || !contactNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = new Order({ name,address, contactNumber });
    await newOrder.save();

    res.status(201).json({ message: 'Order submitted successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
