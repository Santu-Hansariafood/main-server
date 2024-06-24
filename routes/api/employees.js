const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

router.post('/register', EmployeeController.registerEmployee);
router.post('/login', EmployeeController.loginEmployee);
router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getEmployeeById);
router.get('/mobile/:mobile', EmployeeController.getEmployeeByMobile);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
