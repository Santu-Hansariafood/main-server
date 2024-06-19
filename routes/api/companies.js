// routes/api/companies.js

const express = require('express');
const router = express.Router();
const CompanyController = require('../../controllers/CompanyController');

router.post('/', CompanyController.createCompany);
router.get('/', CompanyController.getAllCompanies);
router.get('/:id', CompanyController.getCompanyById);
router.put('/:id', CompanyController.updateCompanyById);
router.delete('/:id', CompanyController.deleteCompanyById);

module.exports = router;
