const Consignee = require('../models/consigneeModel');

// Get all consignees
const getAllConsignees = async (req, res) => {
  try {
    const consignees = await Consignee.find();
    res.json(consignees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get consignee by ID
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

// Create consignees
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

      // Check for duplicates
      const existingConsignee = await Consignee.findOne({
        name: consignee.name,
        mobile: consignee.mobile,
        email: consignee.email,
        address: consignee.address,
        gstNo: consignee.gstNo,
        panNo: consignee.panNo,
        state: consignee.state,
        location: consignee.location,
      });

      if (existingConsignee) {
        return res.status(400).send('Consignee already exists.');
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

// Update consignee by ID
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

// Delete consignee by ID
const deleteConsigneeById = async (req, res) => {
  try {
    await res.consignee.deleteOne();
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
