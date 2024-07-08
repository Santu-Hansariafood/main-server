// controllers/ConsigneeController.js

const Consignee = require('../models/consigneeModel');

const getAllConsignees = async (req, res) => {
  try {
    const consignees = await Consignee.find();
    res.json(consignees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getConsigneeById = async (req, res, next) => {
  let consignee;
  try {
    consignee = await Consignee.findById(req.params.id);
    if (!consignee) {
      return res.status(404).json({ message: 'Consignee not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.consignee = consignee;
  next();
};

const createConsignee = async (req, res) => {
  try {
    const consignees = req.body;

    if (!Array.isArray(consignees) || consignees.length === 0) {
      return res.status(400).send('Invalid consignee data.');
    }

    const savedConsignees = [];
    for (const consignee of consignees) {
      if (!consignee.name || !consignee.mobile || !consignee.email || !consignee.address || !consignee.gstNo || !consignee.panNo || !consignee.state || !consignee.location) {
        return res.status(400).send('Required fields are missing.');
      }

      const newConsignee = new Consignee(consignee);
      const savedConsignee = await newConsignee.save();
      savedConsignees.push(savedConsignee);
    }

    res.status(201).send(savedConsignees);
  } catch (error) {
    console.error('Error saving consignee details:', error);
    res.status(500).send('Server error.');
  }
};

const updateConsigneeById = async (req, res) => {
  const { name, mobile, email, address, gstNo, panNo, state, location } = req.body;

  if (name != null) res.consignee.name = name;
  if (mobile != null) res.consignee.mobile = mobile;
  if (email != null) res.consignee.email = email;
  if (address != null) res.consignee.address = address;
  if (gstNo != null) res.consignee.gstNo = gstNo;
  if (panNo != null) res.consignee.panNo = panNo;
  if (state != null) res.consignee.state = state;
  if (location != null) res.consignee.location = location;

  try {
    const updatedConsignee = await res.consignee.save();
    res.json(updatedConsignee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteConsigneeById = async (req, res) => {
  try {
    await res.consignee.remove();
    res.json({ message: 'Deleted consignee' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllConsignees,
  getConsigneeById,
  createConsignee,
  updateConsigneeById,
  deleteConsigneeById,
};
