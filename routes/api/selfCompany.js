const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const selfCompanyController = require('../../controllers/selfCompanyController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/self-company
// @desc    Add a new self company
// @access  Public
router.post('/', upload.single('companyLogo'), selfCompanyController.addSelfCompany);

// @route   GET api/self-company
// @desc    Get all self companies
// @access  Public
router.get('/', selfCompanyController.getSelfCompanies);

// @route   DELETE api/self-company/:id
// @desc    Delete a self company
// @access  Public
router.delete('/:id', selfCompanyController.deleteSelfCompany);

module.exports = router;
