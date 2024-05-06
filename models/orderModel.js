const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  selectedProducts: [{
    type: String,
  }],
  qualityParameters: {
    broken: String,
    small_gain: String,
    moisture: String,
    damage: String,
    fungus: String
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
