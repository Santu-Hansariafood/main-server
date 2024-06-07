const mongoose = require("mongoose");

const farmerAccountDetailsSchema = new mongoose.Schema(
  {
    accountHolderName: { type: String, required: false },
    bankName: { type: String, required: false },
    branchName: { type: String, required: false },
    accountNumber: { type: String, required: false },
    ifscNumber: { type: String, required: false },
  },
  { _id: false }
);

const qualityParamSchema = new mongoose.Schema(
  {
    label: { type: String, required: false },
    claim: { type: String, required: false },
    basic: { type: String, required: false },
    actual: { type: String, required: false },
    excess: { type: String, required: false },
    claimPercentage: { type: String, required: false },
    claimAmount: { type: String, required: false },
  },
  { _id: false }
);

const billSchema = new mongoose.Schema(
  {
    lorryNumber: { type: String, required: false },
    qualityParams: [qualityParamSchema],
    totalBag: { type: String, required: false },
    grossWeight: { type: String, required: false },
    tareWeight: { type: String, required: false },
    netWeight: { type: String, required: false },
    deltaWeight: { type: String, required: false },
    paymentWeight: { type: String, required: false },
    rate: { type: String, required: false },
    unloadingCost: { type: Number, required: false },
    totalBagCost: { type: Number, required: false },
    totalUnloadingCost: { type: Number, required: false },
    payableAmount: { type: String, required: false },
    claim: { type: Number, required: false },
    claimAmount: { type: Number, required: false },
    netAmount: { type: String, required: false },
    totalClaim: { type: Number, required: false },
    netPayment: { type: Number, required: false },
    grossPayment: { type: String, required: false },
    totalClaimCost: { type: Number, required: false },
    totalExpense: { type: Number, required: false },
    mobileNumber: { type: String, required: false },
    farmerId: { type: String, required: false },
    farmerName: { type: String, required: false },
    farmerAddress: { type: String, required: false },
    farmerAccountDetails: farmerAccountDetailsSchema,
    orderId: { type: String, unique: false },
    billNumber: { type: Number, unique: false },
    company: { type: String, required: false },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
