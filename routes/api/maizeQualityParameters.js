const express = require("express");
const router = express.Router();
const MaizeQualityParametersController = require("../../controllers/MaizeQualityParametersController");

router.get("/", MaizeQualityParametersController.getAllMaizeQualityParameters);
router.get(
  "/:id",
  MaizeQualityParametersController.getMaizeQualityParameterById
);
router.post("/", MaizeQualityParametersController.createMaizeQualityParameter);
router.put(
  "/:id",
  MaizeQualityParametersController.updateMaizeQualityParameterById
);
router.delete(
  "/:id",
  MaizeQualityParametersController.deleteMaizeQualityParameterById
);

module.exports = router;
