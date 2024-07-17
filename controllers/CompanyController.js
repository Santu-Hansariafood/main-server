const Company = require('../models/companyModel');

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { companyName, location, billingAddress, gstNo, panNo, phoneNumbers, emails, consignees } = req.body;

    // Check for duplicate company
    const existingCompany = await Company.findOne({ companyName, location, gstNo, panNo });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const newCompany = new Company({ companyName, location, billingAddress, gstNo, panNo, phoneNumbers, emails, consignees });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('consignees');
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('consignees');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update company by ID
const updateCompanyById = async (req, res) => {
  try {
    const { companyName, location, billingAddress, gstNo, panNo, phoneNumbers, emails, consignees } = req.body;
    
    // Check for duplicate company (excluding the current one)
    const existingCompany = await Company.findOne({ companyName, location, gstNo, panNo, _id: { $ne: req.params.id } });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { companyName, location, billingAddress, gstNo, panNo, phoneNumbers, emails, consignees },
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete company by ID
const deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};
