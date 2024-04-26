const express = require("express");
const router = express.Router();
const FarmerRegister = require("../models/farmerRegisterModel");

// POST route to register a new farmer
router.post("/registerFarmer", async (req, res) => {
  try {
    const {
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      policeStation,
      village,
      pinCode,
      adherNumber,
      panNumber,
      gstNumber,
      accountNumber,
      ifscNumber,
      branchName,
      accountHolderName,
      bankName,
    } = req.body;

    // Create a new farmer record in the database
    const newFarmer = await FarmerRegister.create({
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      policeStation,
      village,
      pinCode,
      adherNumber,
      panNumber,
      gstNumber,
      accountNumber,
      ifscNumber,
      branchName,
      accountHolderName,
      bankName,
    });

    res.status(201).json({ msg: "New farmer registered successfully.", data: newFarmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all farmers
router.get("/registerFarmer", async (req, res) => {
  try {
    const farmers = await FarmerRegister.find();
    res.status(200).json({ farmers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a single farmer by ID
router.get("/registerFarmer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await FarmerRegister.findById(id);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ farmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update a farmer by ID
router.put("/registerFarmer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFarmer = await FarmerRegister.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer updated successfully", data: updatedFarmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a farmer by ID
router.delete("/registerFarmer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFarmer = await FarmerRegister.findByIdAndDelete(id);

    if (!deletedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer deleted successfully", data: deletedFarmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
