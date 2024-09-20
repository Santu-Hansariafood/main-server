const express = require('express');
const locationTrackController = require('../../controllers/locationTrackController');

const router = express.Router();

router.post('/track-location', locationTrackController.addLocationTrack);

router.get('/location/:employeeId', locationTrackController.getEmployeeLocation);

module.exports = router;
