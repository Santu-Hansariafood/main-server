const mongoose = require('mongoose');

const selfCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  gstNo: {
    type: String,
    required: true,
  },
  panNo: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String, // URL of the uploaded logo
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SelfCompany', selfCompanySchema);
