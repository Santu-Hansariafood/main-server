const express = require('express');
const router = express.Router();
const GodownController = require('../../controllers/GodownController');

router.post('/', GodownController.addGodown);
router.get('/', GodownController.getAllGodowns);
router.get('/:id', GodownController.getGodownById);
router.put('/:id', GodownController.updateGodownById);
router.delete('/:id', GodownController.deleteGodownById);

module.exports = router;
