const LocationTrack = require('../models/LocationTrack');

const addLocationTrack = async (employeeId, lat, lng, locationName) => {
  const newLocation = new LocationTrack({
    employeeId,
    coordinates: { lat, lng },
    locationName,
  });
  return await newLocation.save();
};

const getLocationByEmployee = async (employeeId) => {
  return await LocationTrack.find({ employeeId }).sort({ timestamp: -1 });
};

module.exports = {
  addLocationTrack,
  getLocationByEmployee,
};
