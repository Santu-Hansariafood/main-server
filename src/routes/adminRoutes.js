const express = require("express");
const router = express.Router();
const AdminRegister = require("../models/adminRegisterModel");

// POST route to register a new admin
router.post("/registerAdmin", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Create a new admin record in the database
    const newAdmin = await AdminRegister.create({
      username,
      password,
      email,
    });

    res.status(201).json({ msg: "New admin registered successfully.", data: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all admins
router.get("/registerAdmin", async (req, res) => {
  try {
    const admins = await AdminRegister.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a single admin by ID
router.get("/registerAdmin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await AdminRegister.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an admin by ID
router.put("/registerAdmin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await AdminRegister.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete an admin by ID
router.delete("/registerAdmin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await AdminRegister.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully", data: deletedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
