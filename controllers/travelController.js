const TravelDetail = require("../models/TravelDetail");

// Add new travel detail
const addTravelDetail = async (req, res) => {
  const { employeeName, startReading, endReading, date } = req.body;

  try {
    const newTravelDetail = new TravelDetail({
      employeeName,
      startReading,
      endReading,
      date,
    });

    const savedDetail = await newTravelDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all travel details
const getAllTravelDetails = async (req, res) => {
  try {
    const travelDetails = await TravelDetail.find();
    res.status(200).json(travelDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get travel detail by ID
const getTravelDetailById = async (req, res) => {
  const { id } = req.params;

  try {
    const travelDetail = await TravelDetail.findById(id);
    if (!travelDetail) {
      return res.status(404).json({ message: "Travel detail not found" });
    }
    res.status(200).json(travelDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update travel detail by ID
const updateTravelDetail = async (req, res) => {
  const { id } = req.params;
  const { employeeName, startReading, endReading, date } = req.body;

  try {
    const updatedDetail = await TravelDetail.findByIdAndUpdate(
      id,
      { employeeName, startReading, endReading, date },
      { new: true, runValidators: true }
    );

    if (!updatedDetail) {
      return res.status(404).json({ message: "Travel detail not found" });
    }

    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete travel detail by ID
const deleteTravelDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDetail = await TravelDetail.findByIdAndDelete(id);

    if (!deletedDetail) {
      return res.status(404).json({ message: "Travel detail not found" });
    }

    res.status(200).json({ message: "Travel detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Check if travel detail entry exists for today
const checkTodayEntry = async (req, res) => {
  const { employeeName } = req.query;

  try {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    const entryExists = await TravelDetail.findOne({
      employeeName,
      timestamp: { $gte: oneDayAgo }, // find entries within the last 24 hours
    });

    if (entryExists) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addTravelDetail,
  getAllTravelDetails,
  getTravelDetailById,
  updateTravelDetail,
  deleteTravelDetail,
  checkTodayEntry,
};
