const MaizeQualityParameters = require('../models/maizeQualityModel');

const getAllMaizeQualityParameters = async (req, res) => {
  try {
    const parameters = await MaizeQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaizeQualityParameterById = async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Maize quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMaizeQualityParameter = async (req, res) => {
  try {
    const parameter = new MaizeQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMaizeQualityParameterById = async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parameter) {
      return res.status(404).json({ message: "Maize quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMaizeQualityParameterById = async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findByIdAndDelete(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Maize quality parameter not found" });
    }
    res.status(200).json({ message: "Maize quality parameter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMaizeQualityParameters,
  getMaizeQualityParameterById,
  createMaizeQualityParameter,
  updateMaizeQualityParameterById,
  deleteMaizeQualityParameterById
};
