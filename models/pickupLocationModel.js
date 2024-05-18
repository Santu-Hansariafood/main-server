const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    landmark:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const PickupLocation = mongoose.model("PickupLocation", locationSchema);

module.exports = PickupLocation;
