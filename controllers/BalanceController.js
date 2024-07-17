// controllers/balanceController.js
const Balance = require('../models/BalanceModel');

// Create a new balance entry
exports.createBalance = async (req, res) => {
  try {
    const newBalance = new Balance(req.body);
    const balance = await newBalance.save();
    res.status(201).json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all balance entries
exports.getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find();
    res.status(200).json(balances);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a balance entry by ID
exports.getBalanceById = async (req, res) => {
  try {
    const balance = await Balance.findById(req.params.id);
    if (!balance) {
      return res.status(404).json({ message: 'Balance not found' });
    }
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a balance entry by ID
exports.updateBalanceById = async (req, res) => {
  try {
    const updatedBalance = await Balance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBalance) {
      return res.status(404).json({ message: 'Balance not found' });
    }
    res.status(200).json(updatedBalance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a balance entry by ID
exports.deleteBalanceById = async (req, res) => {
  try {
    const deletedBalance = await Balance.findByIdAndDelete(req.params.id);
    if (!deletedBalance) {
      return res.status(404).json({ message: 'Balance not found' });
    }
    res.status(200).json({ message: 'Balance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
