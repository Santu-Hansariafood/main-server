const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    selectedBuyer: String,
    selectedConsignee: String,
    selectedProduct: String,
    companyName: String,
    buyerRate: Number,
    buyerQuantity: Number,
    paymentTerms: String,
    delivery: String,
    selectedDate: Date,
    startTime: String,
    endTime: String,
    qualityParameters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
