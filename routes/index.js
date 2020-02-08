// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();

// Home Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard/Leaderboard
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;