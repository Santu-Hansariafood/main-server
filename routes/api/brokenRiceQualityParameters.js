// routes/api/brokenRiceQualityParameters.js

const express = require('express');
const router = express.Router();
const BrokenRiceQualityParametersController = require('../../controllers/BrokenRiceQualityParametersController');

router.get('/', BrokenRiceQualityParametersController.getAllBrokenRiceQualityParameters);

router.get('/:id', BrokenRiceQualityParametersController.getBrokenRiceQualityParameterById);

router.post('/', BrokenRiceQualityParametersController.createBrokenRiceQualityParameter);

router.put('/:id', BrokenRiceQualityParametersController.updateBrokenRiceQualityParameterById);

router.delete('/:id', BrokenRiceQualityParametersController.deleteBrokenRiceQualityParameterById);

module.exports = router;
