const LocationTrack = require("../models/LocationTrack");

const addLocationTrack = async (employeeId, lat, lng) => {
  const lastLocation = await LocationTrack.findOne({ employeeId }).sort({
    timestamp: -1,
  });

  const currentTime = new Date();

  if (lastLocation) {
    const lastLocationTime = new Date(lastLocation.timestamp);

    const timeDifference = (currentTime - lastLocationTime) / (1000 * 60 * 60);
    if (timeDifference < 24) {
      lastLocation.coordinates.lat = lat;
      lastLocation.coordinates.lng = lng;
      return await lastLocation.save();
    }
  }

  const newLocation = new LocationTrack({
    employeeId,
    coordinates: { lat, lng },
    timestamp: currentTime,
  });

  return await newLocation.save();
};

module.exports = {
  addLocationTrack,
  getLocationByEmployee,
};
