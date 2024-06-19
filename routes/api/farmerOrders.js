const express = require('express');
const router = express.Router();
const FarmerOrderController = require('../../controllers/FarmerOrderController');

router.get('/', FarmerOrderController.getAllFarmerOrders);

router.get('/:id', FarmerOrderController.getFarmerOrder, FarmerOrderController.getFarmerOrderById);

router.post('/', FarmerOrderController.createFarmerOrder);

router.put('/:id', FarmerOrderController.getFarmerOrder, FarmerOrderController.updateFarmerOrder);

router.delete('/:id', FarmerOrderController.getFarmerOrder, FarmerOrderController.deleteFarmerOrder);

module.exports = router;
