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
    const tasks = await Task.find()
      .populate("assignTo", "firstname lastname")
      .exec();

    res.status(200).json({
      tasks,
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
    const { status, feedback, appointedBy, assignTo } = req.body;
    const updateFields = { status, feedback };

    if (appointedBy) {
      updateFields.appointedBy = appointedBy;
    }

    if (assignTo) {
      updateFields.assignTo = assignTo;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.reassignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignTo } = req.body;

    if (!assignTo) {
      return res.status(400).json({ message: "New assignee is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { assignTo, status: "Assigned" },
      {
        new: true,
        runValidators: true,
      }
    ).populate("assignTo", "firstname lastname");

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

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
