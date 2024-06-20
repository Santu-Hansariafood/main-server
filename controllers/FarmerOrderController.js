const FarmerOrder = require('../models/farmerOrderModel');

const getAllFarmerOrders = async (req, res) => {
  try {
    const farmers = await FarmerOrder.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFarmerOrderById = async (req, res) => {
  res.json(res.farmer);
};

const createFarmerOrder = async (req, res) => {
  const farmer = new FarmerOrder({
    farmerName: req.body.farmerName,
    farmerId: req.body.farmerId,
    tons: req.body.tons,
    weightPerBag: req.body.weightPerBag,
    ratePerTon: req.body.ratePerTon,
    totalRupees: req.body.totalRupees,
    totalRupeesWords: req.body.totalRupeesWords,
  });

  try {
    const newFarmer = await farmer.save();
    res.status(201).json(newFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFarmerOrder = async (req, res) => {
  if (req.body.farmerName != null) {
    res.farmer.farmerName = req.body.farmerName;
  }
  if (req.body.farmerId != null) {
    res.farmer.farmerId = req.body.farmerId;
  }
  if (req.body.tons != null) {
    res.farmer.tons = req.body.tons;
  }
  if (req.body.weightPerBag != null) {
    res.farmer.weightPerBag = req.body.weightPerBag;
  }
  if (req.body.ratePerTon != null) {
    res.farmer.ratePerTon = req.body.ratePerTon;
  }
  if (req.body.totalRupees != null) {
    res.farmer.totalRupees = req.body.totalRupees;
  }
  if (req.body.totalRupeesWords != null) {
    res.farmer.totalRupeesWords = req.body.totalRupeesWords;
  }
  try {
    const updatedFarmer = await res.farmer.save();
    res.json(updatedFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFarmerOrder = async (req, res) => {
  try {
    await res.farmer.remove();
    res.json({ message: "Deleted farmer" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFarmerOrder = async (req, res, next) => {
  let farmer;
  try {
    farmer = await FarmerOrder.findById(req.params.id);
    if (farmer == null) {
      return res.status(404).json({ message: "Cannot find farmer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.farmer = farmer;
  next();
};

module.exports = {
  getAllFarmerOrders,
  getFarmerOrderById,
  createFarmerOrder,
  updateFarmerOrder,
  deleteFarmerOrder,
  getFarmerOrder
};
