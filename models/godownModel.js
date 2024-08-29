const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  landmark: { type: String, required: true },
  pin: { type: String, required: true },
  state: { type: String, required: true },
});

const qualityParameterSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  accepted: { type: String, required: true },
  upto: { type: String, required: true },
  claim: {type: String, required: true }
});

const godownSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: locationSchema, required: true },
  rate: { type: Number, required: true },
  quality: { type: [qualityParameterSchema], required: true },
  totalCapacity: { type: Number, required: true },
});

const Godown = mongoose.model("Godown", godownSchema);

module.exports = Godown;
