// controllers/locationTrackController.js

const locationTrackService = require('../services/locationTrackService');

const addLocationTrack = async (req, res) => {
  const { employeeId, lat, lng } = req.body;

  try {
    const locationTrack = await locationTrackService.addLocationTrack(employeeId, lat, lng);
    return res.status(201).json({
      success: true,
      message: 'Location tracked successfully',
      data: locationTrack,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error tracking location',
      error: error.message,
    });
  }
};

const getEmployeeLocation = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const locationData = await locationTrackService.getLocationByEmployee(employeeId);
    return res.status(200).json({
      success: true,
      data: locationData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching location data',
      error: error.message,
    });
  }
};

module.exports = {
  addLocationTrack,
  getEmployeeLocation,
};
