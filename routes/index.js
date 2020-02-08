// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();
// Bring in the enstureAutheticated
const {
    ensureAuthenticated
} = require('../config/auth');

// Home Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard/Leaderboard
router.get('/dashboard', ensureAuthenticated, (req, res) => // <-- bringing in ensureAuthenticated 'protects' this route
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;