// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();

// Login Page
router.get('/login', (req, res) => res.send('Login'));

// Register Page
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;