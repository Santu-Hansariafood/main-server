const SelfCompany = require('../models/SelfCompany');
const path = require('path');

exports.addSelfCompany = async (req, res) => {
  const { companyName, companyAddress, companyLocation, gstNo, panNo } = req.body;
  const companyLogo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newCompany = new SelfCompany({
      companyName,
      companyAddress,
      companyLocation,
      gstNo,
      panNo,
      companyLogo,
    });

    const savedCompany = await newCompany.save();
    res.json({ message: 'Company details added successfully', company: savedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding company details' });
  }
};

exports.getSelfCompanies = async (req, res) => {
  try {
    const companies = await SelfCompany.find();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
};

exports.deleteSelfCompany = async (req, res) => {
  try {
    const company = await SelfCompany.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    await company.remove();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting company' });
  }
};
