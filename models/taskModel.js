const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    assignTo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["High", "Medium", "Low"],
    },
    status: {
      type: String,
      default: "Assigned",
      enum: ["Pending", "Accepted", "Complete", "Rejected"],
    },
    feedback: {
      type: String,
    },
    appointedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
