const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  billingAddress: { type: String, required: true },
  gstNo: { type: String, required: true },
  panNo: { type: String, required: true },
  phoneNumbers: { type: [String], required: true },
  emails: { type: [String], required: true },
  consignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consignee' }]
});

module.exports = mongoose.model('Company', CompanySchema);
