const Buyer = require("../models/buyerModel");

exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBuyer = async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).json({ message: "Buyer created successfully", buyer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBuyer = async (req, res) => {
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBuyer)
      return res.status(404).json({ message: "Buyer not found" });
    res
      .status(200)
      .json({ message: "Buyer updated successfully", updatedBuyer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBuyer = async (req, res) => {
  try {
    const deletedBuyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!deletedBuyer)
      return res.status(404).json({ message: "Buyer not found" });
    res.status(200).json({ message: "Buyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
