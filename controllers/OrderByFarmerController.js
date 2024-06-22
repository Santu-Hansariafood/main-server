const OrderByFarmer = require('../models/orderModelByFarmer');

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderByFarmer.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const order = new OrderByFarmer({
    farmerId: req.body.farmerId,
    farmerName: req.body.farmerName,
    productName: req.body.productName,
    totalBags: req.body.totalBags,
    weightPerBag: req.body.weightPerBag,
    ratePerTon: req.body.ratePerTon,
    totalPrice: req.body.totalPrice,
    qualityParameters: req.body.qualityParameters,
    address: req.body.address,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ message: err.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.body.farmerId != null) {
      order.farmerId = req.body.farmerId;
    }
    if (req.body.farmerName != null) {
      order.farmerName = req.body.farmerName;
    }
    if (req.body.productName != null) {
      order.productName = req.body.productName;
    }
    if (req.body.totalBags != null) {
      order.totalBags = req.body.totalBags;
    }
    if (req.body.weightPerBag != null) {
      order.weightPerBag = req.body.weightPerBag;
    }
    if (req.body.ratePerTon != null) {
      order.ratePerTon = req.body.ratePerTon;
    }
    if (req.body.totalPrice != null) {
      order.totalPrice = req.body.totalPrice;
    }
    if (req.body.qualityParameters != null) {
      order.qualityParameters = req.body.qualityParameters;
    }
    if (req.body.address != null) {
      order.address = req.body.address;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.remove();
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
