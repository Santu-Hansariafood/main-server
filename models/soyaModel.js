const mongoose = require("mongoose");

const soyaQualityParametersSchema = new mongoose.Schema({
  protein: {
    type: String,
    required: true,
  },
  moisture: {
    type: String,
    required: true,
  },
  ss: {
    type: String,
    required: true,
  },
  fibre: {
    type: String,
    required: true,
  },
  oil: {
    type: String,
    required: true,
  },
  mandi: {
    type: String,
    enum: ["applicable", "not applicable"],
    required: true,
  },
});

const SoyaQualityParameters = mongoose.model(
  "SoyaQualityParameters",
  soyaQualityParametersSchema
);

module.exports = SoyaQualityParameters;
