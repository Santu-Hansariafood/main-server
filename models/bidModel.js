const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    buyer: String,
    buyerPhoneNumber: Number,
    buyerLocation: String,
    buyerConsignee: String,
    requireFinance: {
      type: String,
      enum: ['YES', 'NO'],
    },
    product: String,
    quantity: String,
    unit: String,
    rateForBid: {
      type: Number,
      required: true,
    },
    date: String,
    startTime: String,
    endTime: String,
    paymentTerms: String,
    delivery: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model('Bid', bidSchema);
