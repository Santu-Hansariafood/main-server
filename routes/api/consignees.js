// routes/api/consignees.js

const express = require('express');
const router = express.Router();
const ConsigneeController = require('../../controllers/ConsigneeController');

router.get('/', ConsigneeController.getAllConsignees);

router.get('/:id', ConsigneeController.getConsigneeById, (req, res) => {
  res.json(res.consignee);
});

router.post('/', ConsigneeController.createConsignee);

router.put('/:id', ConsigneeController.getConsigneeById, ConsigneeController.updateConsigneeById);

router.delete('/:id', ConsigneeController.getConsigneeById, ConsigneeController.deleteConsigneeById);

module.exports = router;
