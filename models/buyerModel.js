const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    mobile: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    isFirstLogin: { type: String, required: false, default: "YES" },
    companyName: { type: String, required: false },
    location: { type: String, required: false },
    gstNo: { type: String, required: false },
    billingAddress: { type: String, required: false },
    shippingAddress: { type: String, required: false },
    mappedFinancer: { type: String, required: false },
    state: { type: String, required: false },
    panNo: { type: String, required: false },
    products: { type: String, required: false },
    bidingLocations: { type: String, required: false },
    cityOrigins: { type: String, required: false },
    otherCompanies: { type: String, required: false },
    consignees: { type: String, required: false },
  },
  { timestamps: true }
);

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
