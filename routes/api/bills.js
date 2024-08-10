const express = require("express");
const router = express.Router();
const BillController = require("../../controllers/BillController");

router.get("/", BillController.getAllBills);
router.get("/:id", BillController.getBillById);
router.post("/", BillController.createBill);
router.put("/:id", BillController.updateBill);
router.delete("/:id", BillController.deleteBill);

module.exports = router;
