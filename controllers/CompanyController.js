// controllers/CompanyController.js

const Company = require('../models/companyModel');

const createCompany = async (req, res) => {
  try {
    const { companyName, location, billingAddress, gstNo } = req.body;
    const newCompany = new Company({ companyName, location, billingAddress, gstNo });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCompanyById = async (req, res) => {
  try {
    const { companyName, location, billingAddress, gstNo } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { companyName, location, billingAddress, gstNo },
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
