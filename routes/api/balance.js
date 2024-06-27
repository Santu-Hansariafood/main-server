// routes/balanceRoutes.js
const express = require('express');
const router = express.Router();
const balanceController = require('../../controllers/BalanceController');

// Create a new balance entry
router.post('/', balanceController.createBalance);

// Get all balance entries
router.get('/', balanceController.getAllBalances);

// Get a balance entry by ID
router.get('/:id', balanceController.getBalanceById);

// Update a balance entry by ID
router.put('/:id', balanceController.updateBalanceById);

// Delete a balance entry by ID
router.delete('/:id', balanceController.deleteBalanceById);

module.exports = router;
