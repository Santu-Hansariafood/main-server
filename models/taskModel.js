const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    enum: ['High', 'Medium', 'Low'],
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Accepted', 'Complete'],
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
