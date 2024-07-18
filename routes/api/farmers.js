// const express = require('express');
// const router = express.Router();
// const farmerController = require('../../controllers/FarmerController');
// const upload = require('../../config/multerConfig');

// router.post('/registerFarmer', upload.fields([
//   { name: 'profilePhoto', maxCount: 1 },
//   { name: 'adherCardPhoto', maxCount: 1 },
//   { name: 'panCardPhoto', maxCount: 1 },
//   { name: 'bankCardPhoto', maxCount: 1 },
//   { name: 'gstCardPhoto', maxCount: 1 },
// ]), farmerController.registerFarmer);

// router.post('/forgotPassword', farmerController.forgotPassword);
// router.post('/login', farmerController.login);
// router.get('/getAllFarmers', farmerController.getAllFarmers);
// router.put('/updateFarmer/:id', farmerController.updateFarmer);
// router.delete('/deleteFarmer/:id', farmerController.deleteFarmer);
// router.get('/getFarmerById/:id', farmerController.getFarmerById);
// router.get('/checkMobileNumber/:query', farmerController.checkMobileNumber);

// module.exports = router;

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

router.post('/forgotPassword', farmerController.forgotPassword);
router.post('/login', farmerController.login);
router.get('/getAllFarmers', farmerController.getAllFarmers);
router.put('/updateFarmer/:id', farmerController.updateFarmer);
router.delete('/deleteFarmer/:id', farmerController.deleteFarmer);
router.get('/getFarmerById/:id', farmerController.getFarmerById);
router.get('/checkMobileNumber/:query', farmerController.checkMobileNumber);
router.get('/registerFarmer-purchasebill/:id', farmerController.getFarmerPurchaseBill);

module.exports = router;