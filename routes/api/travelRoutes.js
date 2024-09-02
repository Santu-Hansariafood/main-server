const express = require("express");
const {
  addTravelDetail,
  getAllTravelDetails,
  getTravelDetailById,
  updateTravelDetail,
  deleteTravelDetail,
  checkTodayEntry,
} = require("../../controllers/travelController");

const router = express.Router();

router.post("/travel-details", addTravelDetail);

router.get("/travel-details", getAllTravelDetails);

router.get("/travel-details/:id", getTravelDetailById);

router.put("/travel-details/:id", updateTravelDetail);

router.delete("/travel-details/:id", deleteTravelDetail);

router.get("/check-entry", checkTodayEntry);

module.exports = router;
