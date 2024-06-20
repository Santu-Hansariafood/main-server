const express = require('express');
const router = express.Router();
const FarmerProductController = require('../../controllers/FarmerProductController');

router.param('id', FarmerProductController.getFarmerProduct);

router.get('/', FarmerProductController.getAllFarmerProducts);

router.get('/:id', FarmerProductController.getFarmerProductById);

router.post('/', FarmerProductController.createFarmerProduct);

router.put('/:id', FarmerProductController.updateFarmerProductById);

router.delete('/:id', FarmerProductController.deleteFarmerProductById);

module.exports = router;
