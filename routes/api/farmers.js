const express = require('express');
const router = express.Router();
const farmerController = require('../../controllers/FarmerController');
const upload = require('../../config/multerConfig');

router.post('/registerFarmer', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'adherCardPhoto', maxCount: 1 },
  { name: 'panCardPhoto', maxCount: 1 },
  { name: 'bankCardPhoto', maxCount: 1 },
  { name: 'gstCardPhoto', maxCount: 1 },
]), farmerController.registerFarmer);

router.post('/forgotPassword', farmerController.forgotPassword);
router.post('/login', farmerController.login);
router.get('/getAllFarmers', farmerController.getAllFarmers);
router.put('/updateFarmer/:id', farmerController.updateFarmer);
router.delete('/deleteFarmer/:id', farmerController.deleteFarmer);
router.get('/getFarmerById/:id', farmerController.getFarmerById);
router.get('/checkMobileNumber/:query', farmerController.checkMobileNumber);

module.exports = router;