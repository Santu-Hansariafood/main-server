const mongoose = require("mongoose");

const RiceMillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["owner", "manager", "agent"], required: true },
    riceMillName: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    district: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiceMill", RiceMillSchema);
