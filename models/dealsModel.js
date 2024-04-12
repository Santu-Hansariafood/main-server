const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    selectedBuyer: String,
    selectedConsignee: String,
    selectedProduct: String,
    buyerRate: Number,
    buyerQuantity: Number,
    // supplierRate: Number,
    // supplierQuantity: Number,
    paymentTerms: String,
    delivery: String,
    selectedDate: Date,
    startTime: String,
    endTime: String,
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
