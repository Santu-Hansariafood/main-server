const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const { taskName, taskDescription, assignTo, priority, appointedBy } = req.body;
    const newTask = await Task.create({
      taskName,
      taskDescription,
      assignTo,
      priority,
      appointedBy,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find()
      .populate("assignTo", "firstname lastname")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Task.countDocuments();
    res.status(200).json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status, feedback },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
