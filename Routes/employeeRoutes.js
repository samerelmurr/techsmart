const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/employeeController');

// Route to handle employee login
router.post('/login', employeeController.loginEmployee);

// Route to handle employee registration
router.post('/register', employeeController.registerEmployee);

module.exports = router;
