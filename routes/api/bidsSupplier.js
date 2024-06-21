const express = require('express');
const router = express.Router();
const BidController = require('../../controllers/BidSupplierController');

router.get('/', BidController.getAllBids);


router.get('/:id', BidController.getBidById);

router.post('/', BidController.createBid);

router.put('/:id', BidController.updateBidById);

router.delete('/:id', BidController.deleteBidById);

module.exports = router;
