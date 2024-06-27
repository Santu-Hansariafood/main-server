// models/Balance.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productFormSchema = new Schema({
  productName: String,
  partyName: String,
  partyCompanyName: String,
  selectDate: Date,
  workDescription: String,
  rejectLorryNo: String,
  employeeName: String
});

const inputFormSchema = new Schema({
  lorryNumber: String,
  regFrom: String,
  loading: Number,
  unloading: Number,
  balance: Number,
  netWeight: Number,
  newLorryNo: String,
  newWeight: Number,
  sendTo: String,
  ac: String,
  acPartyCompany: String
});

const expenseRowSchema = new Schema({
  particular: String,
  bags: Number,
  rate: Number,
  amount: Number
});

const summarySchema = new Schema({
  grandTotal: Number,
  receivableAmount: Number,
  balanceAmount: Number
});

const balanceSchema = new Schema({
  productFormData: productFormSchema,
  inputFormData: inputFormSchema,
  rows: [expenseRowSchema],
  summaryData: summarySchema
});

const Balance = mongoose.model('Balance', balanceSchema);
module.exports = Balance;
