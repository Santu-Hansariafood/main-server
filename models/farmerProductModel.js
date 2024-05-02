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
},{
  timestamps: true
});

// Middleware to ensure selected products are not listed in the database
farmerProductSchema.pre('save', async function(next) {
  try {
    const existingProduct = await FarmerProduct.findOne({
      farmerId: this.farmerId,
      selectedProducts: { $in: this.selectedProducts }
    });
    if (existingProduct) {
      throw new Error('Selected product already exists for this farmer.');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const FarmerProduct = mongoose.model('farmerProduct', farmerProductSchema);

module.exports = FarmerProduct;
