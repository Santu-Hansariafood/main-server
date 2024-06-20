// routes/api/farmerProducts.js

const express = require('express');
const router = express.Router();
const FarmerProductController = require('../../controllers/FarmerProductController');

// Middleware for fetching a farmer product by ID
router.param('id', FarmerProductController.getFarmerProduct);

// GET all farmer products
router.get('/', FarmerProductController.getAllFarmerProducts);

// GET a specific farmer product by ID
router.get('/:id', FarmerProductController.getFarmerProductById);

// POST a new farmer product
router.post('/', FarmerProductController.createFarmerProduct);

// PUT update a farmer product by ID
router.put('/:id', FarmerProductController.updateFarmerProductById);

// DELETE a farmer product by ID
router.delete('/:id', FarmerProductController.deleteFarmerProductById);

module.exports = router;
