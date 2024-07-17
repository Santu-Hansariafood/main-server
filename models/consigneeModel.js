const mongoose = require('mongoose');

const ConsigneeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  gstNo: { type: String, required: true },
  panNo: { type: String, required: true },
  state: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

const Consignee = mongoose.model('Consignee', ConsigneeSchema);

module.exports = Consignee;
