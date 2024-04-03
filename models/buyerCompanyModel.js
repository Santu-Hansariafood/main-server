const mongoose = require("mongoose");

const buyerCompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
    },
    gstNo: {
      type: String,
    },
    panNo: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    passbook: {
      type: String,
      required: true,
    },
    gstCertificate: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BuyerCompany = mongoose.model("BuyerCompany", buyerCompanySchema);

module.exports = BuyerCompany;
