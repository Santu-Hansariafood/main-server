// controllers/FarmerProductController.js
const FarmerProduct = require('../models/farmerProductModel');

async function getFarmerProduct(req, res, next) {
  try {
    const farmerProduct = await FarmerProduct.findById(req.params.id);
    if (!farmerProduct) {
      return res.status(404).json({ message: "Cannot find farmer product" });
    }
    res.farmerProduct = farmerProduct;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getAllFarmerProducts(req, res) {
  try {
    const farmerProducts = await FarmerProduct.find();
    res.json(farmerProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getFarmerProductById(req, res) {
  res.json(res.farmerProduct);
}

async function createFarmerProduct(req, res) {
  try {
    if (!req.body.farmerId) {
      return res.status(400).json({ message: "farmerId is required." });
    }

    const farmerProduct = new FarmerProduct({
      farmerName: req.body.farmerName,
      farmerId: req.body.farmerId,
      selectedProducts: req.body.selectedProducts,
      allProductsSelected: req.body.selectedProducts.length === 5,
    });

    const newFarmerProduct = await farmerProduct.save();
    return res.status(201).json(newFarmerProduct);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.farmerId) {
      try {
        const existingProduct = await FarmerProduct.findOne({
          farmerId: req.body.farmerId,
        });
        if (existingProduct) {
          existingProduct.farmerName = req.body.farmerName;
          existingProduct.selectedProducts = req.body.selectedProducts;
          existingProduct.allProductsSelected =
            req.body.selectedProducts.length === 5;
          const updatedProduct = await existingProduct.save();
          return res.status(200).json(updatedProduct);
        } else {
          return res.status(400).json({
            message:
              "Unable to find existing document for the provided farmerId.",
          });
        }
      } catch (updateErr) {
        return res.status(400).json({ message: updateErr.message });
      }
    } else {
      return res.status(400).json({ message: err.message });
    }
  }
}

async function updateFarmerProduct(req, res) {
  if (req.body.farmerName != null) {
    res.farmerProduct.farmerName = req.body.farmerName;
  }
  if (req.body.selectedProducts != null) {
    res.farmerProduct.selectedProducts = req.body.selectedProducts;
    res.farmerProduct.allProductsSelected =
      req.body.selectedProducts.length === 5;
  }
  try {
    const updatedFarmerProduct = await res.farmerProduct.save();
    res.json(updatedFarmerProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteFarmerProduct(req, res) {
  try {
    await res.farmerProduct.remove();
    res.json({ message: "Deleted farmer product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getFarmerProduct,
  getAllFarmerProducts,
  getFarmerProductById,
  createFarmerProduct,
  updateFarmerProduct,
  deleteFarmerProduct
};
