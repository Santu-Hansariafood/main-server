const Farmer = require("../models/farmerData");

// Create a new farmer entry
exports.createFarmerData = async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res
      .status(201)
      .json({ message: "Farmer data created successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: "Failed to create farmer data", error });
  }
};

// Get all farmers
exports.getFarmersData = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve farmers", error });
  }
};

// Get a farmer by ID
exports.getFarmerDataById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve farmer", error });
  }
};

// Update a farmer by ID
exports.updateFarmerData = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res
      .status(200)
      .json({ message: "Farmer data updated successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: "Failed to update farmer data", error });
  }
};

// Delete a farmer by ID
exports.deleteFarmerData = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.status(200).json({ message: "Farmer data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete farmer data", error });
  }
};
