const express = require('express');

// Controller functions for Grievance Forum users
const { loginAdmin,signupAdmin } = require('../controllers/adminController');

const router = express.Router();

// Login route for Grievance Forum
router.post('/login', loginAdmin);

// Signup route for Grievance Forum
router.post('/signup', signupAdmin);

module.exports = router;
