const Quality = require('../models/qualityModel');

// GET all quality parameters
const getAllQualities = async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.json(qualities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a specific quality parameter by ID
const getQualityById = (req, res) => {
  res.json(res.quality);
};

// POST a new quality parameter
const createQuality = async (req, res) => {
  const quality = new Quality({
    farmerId: req.body.farmerId,
    farmerName: req.body.farmerName,
    broken: req.body.broken,
    fungus: req.body.fungus,
    damage: req.body.damage,
    smallgain: req.body.smallgain,
    moisture: req.body.moisture,
  });

  try {
    const newQuality = await quality.save();
    res.status(201).json(newQuality);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a quality parameter
const updateQuality = async (req, res) => {
  if (req.body.farmerId != null) {
    res.quality.farmerId = req.body.farmerId;
  }
  if (req.body.farmerName != null) {
    res.quality.farmerName = req.body.farmerName;
  }
  if (req.body.broken != null) {
    res.quality.broken = req.body.broken;
  }
  if (req.body.fungus != null) {
    res.quality.fungus = req.body.fungus;
  }
  if (req.body.damage != null) {
    res.quality.damage = req.body.damage;
  }
  if (req.body.smallgain != null) {
    res.quality.smallgain = req.body.smallgain;
  }
  if (req.body.moisture != null) {
    res.quality.moisture = req.body.moisture;
  }

  try {
    const updatedQuality = await res.quality.save();
    res.json(updatedQuality);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a quality parameter
const deleteQuality = async (req, res) => {
  try {
    await res.quality.remove();
    res.json({ message: "Deleted Quality Parameter" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware function to get quality parameter by ID
const getQuality = async (req, res, next) => {
  try {
    const quality = await Quality.findById(req.params.id);
    if (quality == null) {
      return res.status(404).json({ message: "Cannot find quality parameter" });
    }
    res.quality = quality;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllQualities,
  getQualityById,
  createQuality,
  updateQuality,
  deleteQuality,
  getQuality
};
