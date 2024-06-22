const Godown = require('../models/godownModel');

exports.addGodown = async (req, res) => {
  try {
    const godown = new Godown(req.body);
    await godown.save();
    res.status(201).json(godown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllGodowns = async (req, res) => {
  try {
    const godowns = await Godown.find();
    res.status(200).json(godowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGodownById = async (req, res) => {
  try {
    const godown = await Godown.findById(req.params.id);
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json(godown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGodownById = async (req, res) => {
  try {
    const godown = await Godown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json(godown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGodownById = async (req, res) => {
  try {
    const godown = await Godown.findByIdAndDelete(req.params.id);
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json({ message: "Godown deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
