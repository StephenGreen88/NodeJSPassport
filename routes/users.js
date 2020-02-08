// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    // Deconstructing allows us to pull stuff out from the input on the form
    const { name, email, password, password2 } = req.body;
    let errors = []; // <-- Initialize an array, this is part of the validation process

    // Check the required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all the fields '}); // <-- Message returned if the fields aren't filled out
    }

    // Check to see if passwords match
    if(password != password2) {
        errors.push({ msg: 'Passwords do not match '}); // <-- Message returned if the passwords don't match
    }

    // Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password needs to be 6 or more characters in length'});
    }

    // If there are errors do the following
    if(errors.length > 0 ) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('pass');
    }

});

module.exports = router;