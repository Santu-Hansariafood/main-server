const mongoose = require("mongoose");

const farmerDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: false,
    },
    village: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const FarmerData = mongoose.model(
  "FarmerData",
  farmerDataSchema,
  "farmerdata-without-kyc"
);

module.exports = FarmerData;
