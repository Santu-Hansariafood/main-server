const SoyaQualityParameters = require('../models/soyaModel');

// Get all soya quality parameters
const getAllSoyaQualityParameters = async (req, res) => {
  try {
    const parameters = await SoyaQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific soya quality parameter by ID
const getSoyaQualityParameterById = async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Soya quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new soya quality parameter
const createSoyaQualityParameter = async (req, res) => {
  try {
    const parameter = new SoyaQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a soya quality parameter by ID
const updateSoyaQualityParameterById = async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parameter) {
      return res.status(404).json({ message: "Soya quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a soya quality parameter by ID
const deleteSoyaQualityParameterById = async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findByIdAndDelete(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Soya quality parameter not found" });
    }
    res.status(200).json({ message: "Soya quality parameter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSoyaQualityParameters,
  getSoyaQualityParameterById,
  createSoyaQualityParameter,
  updateSoyaQualityParameterById,
  deleteSoyaQualityParameterById
};
