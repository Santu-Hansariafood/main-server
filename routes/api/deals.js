// routes/api/deals.js

const express = require("express");
const router = express.Router();
const DealController = require("../../controllers/DealController");

router.post("/", DealController.createDeal);

router.get("/", DealController.getAllDeals);

router.get("/:id", DealController.getDealById);

router.delete("/:id", DealController.deleteDealById);

module.exports = router;
