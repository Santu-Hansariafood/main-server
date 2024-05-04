const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  village: { type: String, required: true },
  post: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  selectedProducts: [{ type: String, required: true }],
  quantity: { type: Number, required: true },
  totalBagWeight: { type: Number, required: true },
  pricePerTon: { type: Number, required: true },
});

const qualitySchema = new mongoose.Schema({
  broken: { type: String, required: true },
  moisture: { type: String, required: true },
  fungus: { type: String, required: true },
  damage: { type: String, required: true },
  small_gain: { type: String, required: true },
});

const pickupLocationSchema = new mongoose.Schema({
  locationData: { type: locationSchema, required: true },
  productData: { type: productSchema, required: true },
  qualityData: { type: qualitySchema, required: true },
});

const PickupLocation = mongoose.model("PickupLocation", pickupLocationSchema);

module.exports = PickupLocation;
