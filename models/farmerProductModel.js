const mongoose = require('mongoose');

// Define a map of product IDs to product names
const productIdToNameMap = {
  "1": "Maize",
  "2": "Wheat",
  "3": "Paddy",
  "4": "Soya",
  "5": "Broken Rice"
};

const farmerProductSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
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
},{
  timestamps: true
});

// Pre-save hook to convert product IDs to product names
farmerProductSchema.pre('save', function(next) {
  // Convert selected product IDs to product names
  this.selectedProducts = this.selectedProducts.map(productId => productIdToNameMap[productId]);
  next();
});

const FarmerProduct = mongoose.model('farmerProduct', farmerProductSchema);

module.exports = FarmerProduct;
