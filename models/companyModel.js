const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  billingAddress: { type: String, required: true },
  gstNo: { type: String, required: true },
});

module.exports = mongoose.model('Company', CompanySchema);
