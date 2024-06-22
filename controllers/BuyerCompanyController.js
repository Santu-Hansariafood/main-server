const BuyerCompany = require('../models/BuyerCompany');
const fs = require('fs');

exports.registerBuyerCompany = async (req, res) => {
  try {
    const {
      companyName,
      location,
      billingAddress,
      gstNo,
      panNo,
      accountNumber,
      accountHolderName,
      ifscCode,
      bankName,
      password,
    } = req.body;

    const passbook = req.files['passbook'][0].path;
    const gstCertificate = req.files['gstCertificate'][0].path;
    const panCard = req.files['panCard'][0].path;

    const newBuyerCompany = await BuyerCompany.create({
      companyName,
      location,
      billingAddress,
      gstNo,
      panNo,
      accountNumber,
      accountHolderName,
      ifscCode,
      bankName,
      password,
      passbook,
      gstCertificate,
      panCard,
    });

    res.status(201).json({
      msg: 'New buyer company registered successfully.',
      data: newBuyerCompany,
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.companyName &&
      error.keyPattern.gstNo
    ) {
      return res
        .status(400)
        .send({ message: 'Company name and GST number must be unique.' });
    }
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getAllBuyerCompanies = async (req, res) => {
  try {
    const buyerCompanies = await BuyerCompany.find();
    res.status(200).json({ data: buyerCompanies });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
