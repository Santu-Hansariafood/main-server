const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PickupLocation = mongoose.model("PickupLocation", locationSchema);

module.exports = PickupLocation;
