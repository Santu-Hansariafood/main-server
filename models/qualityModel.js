const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  broken: {
    type: String,
    required: true
  },
  fungus: {
    type: String,
    required: true
  },
  damage: {
    type: String,
    required: true
  },
  smallgain: {
    type: String,
    required: true
  },
  moisture: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Quality = mongoose.model('Quality', qualitySchema);

module.exports = Quality;
