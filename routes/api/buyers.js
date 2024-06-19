const express = require('express');
const router = express.Router();
const BuyerController = require('../../controllers/BuyerController');

router.get('/', BuyerController.getAllBuyers);
router.get('/:id', BuyerController.getBuyerById);
router.post('/', BuyerController.createBuyer);
router.put('/:id', BuyerController.updateBuyer);
router.delete('/:id', BuyerController.deleteBuyer);

module.exports = router;
