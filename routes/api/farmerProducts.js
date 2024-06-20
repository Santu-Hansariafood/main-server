const express = require('express');
const router = express.Router();
const FarmerProductController = require('../../controllers/FarmerProductController');

router.get('/', FarmerProductController.getAllFarmerProducts);

router.get('/:id', FarmerProductController.getFarmerProduct, FarmerProductController.getFarmerProductById);

router.post('/', FarmerProductController.createFarmerProduct);

router.put('/:id', FarmerProductController.getFarmerProduct, FarmerProductController.updateFarmerProduct);

router.delete('/:id', FarmerProductController.getFarmerProduct, FarmerProductController.deleteFarmerProduct);

module.exports = router;
