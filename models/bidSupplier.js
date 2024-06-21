const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSupplierSchema = new Schema({
  godown: { type: Schema.Types.ObjectId, ref: "Godown", required: true },
  location: {
    name: String,
    landmark: String,
    pin: String,
    state: String,
  },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "Quintol" },
  rateForBid: { type: Number, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  paymentTerms: { type: String, required: true },
  delivery: { type: String, required: true },
});

module.exports = mongoose.model("BidSupplier", BidSupplierSchema);
