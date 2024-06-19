const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController');

router.post('/', OrderController.createOrder);

router.get('/', OrderController.getAllOrders);

router.get('/:id', OrderController.getOrderById);

router.put('/:id', OrderController.updateOrderById);

router.delete('/:id', OrderController.deleteOrderById);

module.exports = router;
