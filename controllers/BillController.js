const mongoose = require('mongoose');
const Bill = require('../models/BillModel');
const Counter = require('../models/Counter'); 

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBill = async (req, res) => {
  const { farmerId, ...billData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(farmerId)) {
    return res.status(400).json({ error: "Invalid farmerId format" });
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "billNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const formattedBillNumber = `HANS/${counter.seq.toString().padStart(5, "0")}`;

    const newBill = new Bill({
      billNumber: formattedBillNumber,
      farmerId: new mongoose.Types.ObjectId(farmerId),
      ...billData,
    });

    await newBill.save();
    res.status(200).json(newBill);
  } catch (error) {
    console.error("Error saving bill:", error);
    res.status(500).json({ error: "Failed to create bill" });
  }
};

const updateBill = async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
};
