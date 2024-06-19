const express = require('express');
const router = express.Router();
const ParticipateOnBidController = require('../../controllers/ParticipateOnBidController');

router.post('/', ParticipateOnBidController.createParticipateOnBid);
router.get('/', ParticipateOnBidController.getAllParticipateOnBids);
router.get('/:id', ParticipateOnBidController.getParticipateOnBidById);
router.put('/:id', ParticipateOnBidController.updateParticipateOnBidById);
router.delete('/:id', ParticipateOnBidController.deleteParticipateOnBidById);

module.exports = router;
