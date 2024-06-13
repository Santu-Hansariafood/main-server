const express = require('express');
const router = express.Router();
const Buyer = require('../../models/BillModel');

// Get all buyers
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single buyer by ID
router.get('/:id', async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new buyer
router.post('/', async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).json({ message: 'Buyer created successfully', buyer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a buyer by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBuyer) return res.status(404).json({ message: 'Buyer not found' });
    res.status(200).json({ message: 'Buyer updated successfully', updatedBuyer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a buyer by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBuyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!deletedBuyer) return res.status(404).json({ message: 'Buyer not found' });
    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
