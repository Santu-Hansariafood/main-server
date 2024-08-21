const RiceMill = require('../models/riceMillModel');

// @desc    Register a new Rice Mill
// @route   POST /api/rice-mills/register
const registerRiceMill = async (req, res) => {
  try {
    const newRiceMill = new RiceMill(req.body);
    await newRiceMill.save();
    res.status(201).json({ message: 'Rice Mill registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all Rice Mills
// @route   GET /api/rice-mills
const getRiceMills = async (req, res) => {
  try {
    const riceMills = await RiceMill.find();
    res.json(riceMills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get Rice Mill by ID
// @route   GET /api/rice-mills/:id
const getRiceMillById = async (req, res) => {
  try {
    const riceMill = await RiceMill.findById(req.params.id);
    if (!riceMill) {
      return res.status(404).json({ message: 'Rice Mill not found' });
    }
    res.json(riceMill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update Rice Mill
// @route   PUT /api/rice-mills/:id
const updateRiceMill = async (req, res) => {
  try {
    const updatedRiceMill = await RiceMill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRiceMill) {
      return res.status(404).json({ message: 'Rice Mill not found' });
    }
    res.json({ message: 'Rice Mill updated successfully', updatedRiceMill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete Rice Mill
// @route   DELETE /api/rice-mills/:id
const deleteRiceMill = async (req, res) => {
  try {
    const deletedRiceMill = await RiceMill.findByIdAndDelete(req.params.id);
    if (!deletedRiceMill) {
      return res.status(404).json({ message: 'Rice Mill not found' });
    }
    res.json({ message: 'Rice Mill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerRiceMill,
  getRiceMills,
  getRiceMillById,
  updateRiceMill,
  deleteRiceMill,
};
