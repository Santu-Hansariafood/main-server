const mongoose = require('mongoose');

const QualityParametersSchema = new mongoose.Schema({
  broken: { type: Number, required: true },
  fungus: { type: Number, required: true },
  damage: { type: Number, required: true },
  smallgain: { type: Number, required: true },
  moisture: { type: Number, required: true }
});

const AddressSchema = new mongoose.Schema({
  village: { type: String, required: true },
  post: { type: String, required: true },
  policeStation: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String, required: true }
});

const OrderByFarmerSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  productName: { type: String, required: true },
  totalBags: { type: Number, required: true },
  weightPerBag: { type: Number, required: true },
  ratePerTon: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  qualityParameters: { type: QualityParametersSchema, required: true },
  address: { type: AddressSchema, required: true }
}, { timestamps: true });

const OrderByFarmer = mongoose.model('OrderByFarmer', OrderByFarmerSchema);

module.exports = OrderByFarmer;
