const express = require('express');
const router = express.Router();
const SoyaQualityParametersController = require('../../controllers/SoyaQualityParametersController');

router.get('/', SoyaQualityParametersController.getAllSoyaQualityParameters);
router.get('/:id', SoyaQualityParametersController.getSoyaQualityParameterById);
router.post('/', SoyaQualityParametersController.createSoyaQualityParameter);
router.put('/:id', SoyaQualityParametersController.updateSoyaQualityParameterById);
router.delete('/:id', SoyaQualityParametersController.deleteSoyaQualityParameterById);

module.exports = router;
