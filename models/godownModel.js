const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  landmark: { type: String, required: true },
  pin: { type: String, required: true },
  state: { type: String, required: true },
});

const godownSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: locationSchema, required: true },
});

const Godown = mongoose.model("Godown", godownSchema);

module.exports = Godown;
