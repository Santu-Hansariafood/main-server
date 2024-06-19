const express = require('express');
const router = express.Router();
const OrderByFarmerController = require('../../controllers/OrderByFarmerController');

router.get('/', OrderByFarmerController.getAllOrders);

router.get('/:id', OrderByFarmerController.getOrderById);

router.post('/', OrderByFarmerController.createOrder);

router.put('/:id', OrderByFarmerController.updateOrder);

router.delete('/:id', OrderByFarmerController.deleteOrder);

module.exports = router;
