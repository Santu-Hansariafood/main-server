const express = require('express');
const router = express.Router();
const multer = require('multer');
const farmerController = require('../../controllers/FarmerController');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  '/registerFarmer',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'adherCardPhoto', maxCount: 1 },
    { name: 'panCardPhoto', maxCount: 1 },
    { name: 'bankCardPhoto', maxCount: 1 },
    { name: 'gstCardPhoto', maxCount: 1 },
  ]),
  farmerController.registerFarmer
);

router.post('/forgot-password', farmerController.forgotPassword);
router.post('/login', farmerController.login);
router.get('/registerFarmer', farmerController.getAllFarmers);
router.put('/registerFarmer/:id', farmerController.updateFarmer);
router.delete('/registerFarmer/:id', farmerController.deleteFarmer);
router.get('/registerFarmer/:id', farmerController.getFarmerById);
router.get('/checkMobileNumber/:query', farmerController.checkMobileNumber);

module.exports = router;
