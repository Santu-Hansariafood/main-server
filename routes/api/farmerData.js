const express = require("express");
const farmerDataController = require("../../controllers/FarmerDataController");

const router = express.Router();

router.post("/", farmerDataController.createFarmerData);
router.get("/", farmerDataController.getFarmersData);
router.get("/:id", farmerDataController.getFarmerDataById);
router.put("/:id", farmerDataController.updateFarmerData);
router.delete("/:id", farmerDataController.deleteFarmerData);

module.exports = router;
