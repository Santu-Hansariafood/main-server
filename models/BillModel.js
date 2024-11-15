const mongoose = require('mongoose');

const farmerAccountDetailsSchema = new mongoose.Schema({
  accountHolderName: String,
  bankName: String,
  branchName: String,
  accountNumber: String,
  ifscNumber: String,
  panNumber: String,
});

const qualityParamsSchema = new mongoose.Schema({
  label: String,
  claim: String,
  basic: String,
  actual: String,
  excess: String,
  claimPercentage: String,
  claimAmount: String,
});

const billSchema = new mongoose.Schema({
  billNumber: { type: String, unique: true },
  lorryNumber: { type: String, required: true },
  productName: { type: String },
  qualityParams: [qualityParamsSchema],
  totalBag: { type: Number, required: true },
  grossWeight: { type: Number, required: true },
  tareWeight: { type: Number, required: true },
  netWeight: { type: Number, required: true },
  deltaWeight: { type: Number, required: true },
  paymentWeight: { type: Number, required: true },
  rate: { type: Number, required: true },
  claim: { type: Number, required: true },
  unloadingCost: { type: Number, required: true },
  bagPrice: { type: Number, required: true },
  payableAmount: { type: Number, required: true },
  netAmount: { type: Number, required: true },
  mobileNumber: { type: String, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Farmer' },
  farmerName: { type: String, required: true },
  farmerAddress: { type: String, required: true },
  farmerAccountDetails: farmerAccountDetailsSchema,
  totalUnloadingCost: { type: Number, required: true },
  company: { type: String, required: true },
  selectedGodownName: { type: String, required: true },
  date: {
    type: String,
    // default: () => {
    //   const date = new Date();
    //   const day = String(date.getDate()).padStart(2, '0');
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const year = date.getFullYear();
    //   return `${day}/${month}/${year}`;
    // },
  },
});

module.exports = mongoose.model('Bill', billSchema);
