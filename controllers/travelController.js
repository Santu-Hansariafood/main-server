const TravelDetail = require("../models/TravelDetail");

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

const getAllTravelDetails = async (req, res) => {
  try {
    const travelDetails = await TravelDetail.find();
    res.status(200).json(travelDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

const checkTodayEntry = async (req, res) => {
  const { employeeName } = req.query;

  try {
    const eighteenHoursAgo = new Date();
    eighteenHoursAgo.setHours(eighteenHoursAgo.getHours() - 18);

    const entryExists = await TravelDetail.findOne({
      employeeName,
      timestamp: { $gte: eighteenHoursAgo },
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
