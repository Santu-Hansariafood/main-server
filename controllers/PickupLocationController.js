const PickupLocation = require("../models/pickupLocationModel");

// Middleware to get a pickup location by ID
const getPickupLocation = async (req, res, next) => {
  let pickupLocation;
  try {
    pickupLocation = await PickupLocation.findById(req.params.id);
    if (!pickupLocation) {
      return res.status(404).json({ message: "Pickup location not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.pickupLocation = pickupLocation;
  next();
};

// GET all pickup locations
const getAllPickupLocations = async (req, res) => {
  try {
    const pickupLocations = await PickupLocation.find();
    res.json(pickupLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single pickup location by ID
const getPickupLocationById = (req, res) => {
  res.json(res.pickupLocation);
};

// POST a new pickup location
const createPickupLocation = async (req, res) => {
  const pickupLocation = new PickupLocation({
    village: req.body.village,
    post: req.body.post,
    district: req.body.district,
    pin: req.body.pin,
    landmark: req.body.landmark,
    farmerName: req.body.farmerName,
    farmerId: req.body.farmerId,
  });

  try {
    const newPickupLocation = await pickupLocation.save();
    res.status(201).json(newPickupLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a pickup location by ID
const updatePickupLocation = async (req, res) => {
  if (req.body.village != null) {
    res.pickupLocation.village = req.body.village;
  }
  if (req.body.post != null) {
    res.pickupLocation.post = req.body.post;
  }
  if (req.body.district != null) {
    res.pickupLocation.district = req.body.district;
  }
  if (req.body.pin != null) {
    res.pickupLocation.pin = req.body.pin;
  }
  if (req.body.landmark != null) {
    res.pickupLocation.landmark = req.body.landmark;
  }
  if (req.body.farmerName != null) {
    res.pickupLocation.farmerName = req.body.farmerName;
  }
  if (req.body.farmerId != null) {
    res.pickupLocation.farmerId = req.body.farmerId;
  }

  try {
    const updatedPickupLocation = await res.pickupLocation.save();
    res.json(updatedPickupLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a pickup location by ID
const deletePickupLocation = async (req, res) => {
  try {
    await res.pickupLocation.remove();
    res.json({ message: "Deleted pickup location" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPickupLocation,
  getAllPickupLocations,
  getPickupLocationById,
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
};
