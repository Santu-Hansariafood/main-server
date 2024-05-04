const mongoose = require('mongoose');

// Define the schema for the Location data
const locationSchema = new mongoose.Schema({
  village: { type: String, required: true },
  post: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: String, required: true },
});

// Define the schema for the Product data
const productSchema = new mongoose.Schema({
  selectedProducts: [{ type: String, required: true }],
  quantity: { type: Number, required: true },
  totalBagWeight: { type: Number, required: true },
  pricePerTon: { type: Number, required: true },
});

// Define the schema for the Quality Parameters data
const qualitySchema = new mongoose.Schema({
  broken: { type: String, required: true },
  moisture: { type: String, required: true },
  fungus: { type: String, required: true },
  damage: { type: String, required: true },
  small_gain: { type: String, required: true },
});

// Define the schema for the main data object
const pickupLocationSchema = new mongoose.Schema({
  locationData: { type: locationSchema, required: true },
  productData: { type: productSchema, required: true },
  qualityData: { type: qualitySchema, required: true },
});

// Create a model for the main data object
const PickupLocation = mongoose.model('PickupLocation', pickupLocationSchema);

module.exports = PickupLocation;
