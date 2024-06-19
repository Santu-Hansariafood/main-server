const express = require("express");
const router = express.Router();
const FarmerController = require("../../controllers/FarmerController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/register", FarmerController.registerFarmer);
router.post("/login", FarmerController.login);
router.post("/forgot-password", FarmerController.forgotPassword);
router.get("/", authMiddleware, FarmerController.getFarmers);
router.get("/:id", authMiddleware, FarmerController.getFarmerDetails);
router.put("/:id", authMiddleware, FarmerController.updateFarmer);
router.delete("/:id", authMiddleware, FarmerController.deleteFarmer);

module.exports = router;
