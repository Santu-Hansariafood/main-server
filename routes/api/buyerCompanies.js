const express = require('express');
const router = express.Router();
const BuyerCompanyController = require('../../controllers/BuyerCompanyController');
const upload = require('../../middleware/upload');

router.post(
  '/',
  upload.fields([
    { name: 'passbook', maxCount: 1 },
    { name: 'gstCertificate', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
  ]),
  BuyerCompanyController.registerBuyerCompany
);

router.get('/', BuyerCompanyController.getAllBuyerCompanies);

module.exports = router;
