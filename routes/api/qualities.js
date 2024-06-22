const express = require('express');
const router = express.Router();
const QualityController = require('../../controllers/QualityController');

router.get('/', QualityController.getAllQualities);

router.get('/:id', QualityController.getQuality, QualityController.getQualityById);

router.post('/', QualityController.createQuality);

router.put('/:id', QualityController.getQuality, QualityController.updateQuality);

router.delete('/:id', QualityController.getQuality, QualityController.deleteQuality);

module.exports = router;
