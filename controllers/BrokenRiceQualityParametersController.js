// controllers/BrokenRiceQualityParametersController.js

const BrokenRiceQualityParameters = require('../models/brokenRiceQualityModel');

const getAllBrokenRiceQualityParameters = async (req, res) => {
  try {
    const parameters = await BrokenRiceQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrokenRiceQualityParameterById = async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: 'Broken rice quality parameter not found' });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBrokenRiceQualityParameter = async (req, res) => {
  try {
    const parameter = new BrokenRiceQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBrokenRiceQualityParameterById = async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!parameter) {
      return res.status(404).json({ message: 'Broken rice quality parameter not found' });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBrokenRiceQualityParameterById = async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findByIdAndDelete(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: 'Broken rice quality parameter not found' });
    }
    res.status(200).json({ message: 'Broken rice quality parameter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBrokenRiceQualityParameters,
  getBrokenRiceQualityParameterById,
  createBrokenRiceQualityParameter,
  updateBrokenRiceQualityParameterById,
  deleteBrokenRiceQualityParameterById,
};
