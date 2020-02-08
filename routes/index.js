// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();

router.get('/', (req, res) => res.render('welcome'));

module.exports = router;