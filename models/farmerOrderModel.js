const mongoose = require('mongoose');

const farmerOrderSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true
  },
  farmerId: {
    type: String,
    required: true,
    unique: true
  },
  tons: {
    type: Number,
    required: true
  },
  weightPerBag: {
    type: Number,
    required: true
  },
  ratePerTon: {
    type: Number,
    required: true
  },
  totalRupees: {
    type: Number,
    required: true
  },
  totalRupeesWords: {
    type: String,
    required: true
  }
});

const FarmerOrder = mongoose.model('FarmerOrder', farmerOrderSchema);

module.exports = FarmerOrder;
