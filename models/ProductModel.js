const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
