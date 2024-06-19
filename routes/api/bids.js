// routes/api/bids.js

const express = require('express');
const router = express.Router();
const BidController = require('../../controllers/BidController');

router.get('/', BidController.getAllBids);

router.get('/:id', BidController.getBidById);

router.post('/', BidController.createBid);

router.put('/:id', BidController.updateBidById);

router.delete('/:id', BidController.deleteBidById);

module.exports = router;
