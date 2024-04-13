const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedProducts: {
    type: [String],
    default: [],
  },
  companyName: {
    type: String,
    required: true,
    unique:true
  },
  consignees: {
    type: [String],
    default: [],
  },
},
{timestamps:true});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
