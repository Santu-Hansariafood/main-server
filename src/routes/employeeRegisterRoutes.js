const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const EmployeeRegister = require("../models/employeeRegisterModel");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// POST route to register a new employee
router.post("/", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const profilePhotoPath = req.file.path;

    const newEmployee = await EmployeeRegister.create({
      name,
      email,
      department,
      profilePhoto: profilePhotoPath,
    });

    res.status(201).json({ message: "New employee registered successfully.", data: newEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all employees
router.get("/", async (req, res) => {
  try {
    const employees = await EmployeeRegister.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeRegister.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an employee by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await EmployeeRegister.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await EmployeeRegister.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", data: deletedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
