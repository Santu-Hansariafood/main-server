const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  policeStation: { type: String, required: true },
  village: { type: String, required: true },
  pinCode: { type: String, required: true },
  adherNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  gstNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscNumber: { type: String, required: true },
  branchName: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
  password: { type: String, required: true },
  plainPassword: { type: String, required: true }, // This field should be handled carefully
  profilePhoto: { type: String },
  adherCardPhoto: { type: String },
  panCardPhoto: { type: String },
  bankCardPhoto: { type: String },
  gstCardPhoto: { type: String }
});

module.exports = mongoose.model('FarmerRegister', FarmerSchema);
