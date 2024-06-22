// controllers/DealController.js

const Deal = require('../models/dealsModel');

const createDeal = async (req, res) => {
  try {
    const { selectedProduct, ...dealData } = req.body;
    const deal = await Deal.create({
      selectedProduct,
      ...dealData,
      qualityParameters:
        selectedProduct === "Soya"
          ? { protein: req.body.qualityParameters.protein }
          : selectedProduct === "Maize" || selectedProduct === "Broken Rice"
          ? {
              moisture: req.body.qualityParameters.moisture,
              fungus: req.body.qualityParameters.fungus,
            }
          : {},
    });

    res.status(201).json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find();

    if (!deals || deals.length === 0) {
      return res.status(404).json({ message: "No deals found" });
    }

    res.status(200).json(deals);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.error("Error fetching deal by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDeal = await Deal.findByIdAndDelete(id);

    if (!deletedDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ message: "Deal deleted successfully", deletedDeal });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createDeal,
  getAllDeals,
  getDealById,
  deleteDealById,
};
