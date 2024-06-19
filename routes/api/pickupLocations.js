const express = require('express');
const router = express.Router();
const PickupLocationController = require('../../controllers/PickupLocationController');

// GET all pickup locations
router.get('/', PickupLocationController.getAllPickupLocations);

// GET a single pickup location by ID
router.get('/:id', PickupLocationController.getPickupLocation, PickupLocationController.getPickupLocationById);

// POST a new pickup location
router.post('/', PickupLocationController.createPickupLocation);

// PUT update a pickup location by ID
router.put('/:id', PickupLocationController.getPickupLocation, PickupLocationController.updatePickupLocation);

// DELETE a pickup location by ID
router.delete('/:id', PickupLocationController.getPickupLocation, PickupLocationController.deletePickupLocation);

module.exports = router;
