const mongoose = require('mongoose');

const farmerProductSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
    // unique: true,
  },
  farmerName: {
    type: String,
    required: true
  },
  selectedProducts: {
    type: [String],
    required: true
  },
  allProductsSelected: {
    type: Boolean,
    default: false
  }
});

const FarmerProduct = mongoose.model('farmerProduct', farmerProductSchema);

module.exports = FarmerProduct;
