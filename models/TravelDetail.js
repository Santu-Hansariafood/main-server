const mongoose = require("mongoose");

const travelDetailSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  startReading: { type: String, required: true },
  endReading: { type: String, required: true },
  date: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

const TravelDetail = mongoose.model("TravelDetail", travelDetailSchema);

module.exports = TravelDetail;
