// Require the necessary dependencies
const express = require('express');
// Use the express route
const router = express.Router();
// Bring in bcrypt
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    // Deconstructing allows us to pull stuff out from the input on the form
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = []; // <-- Initialize an array, this is part of the validation process

    // Check the required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'Please fill in all the fields '
        }); // <-- Message returned if the fields aren't filled out
    }

    // Check to see if passwords match
    if (password != password2) {
        errors.push({
            msg: 'Passwords do not match '
        }); // <-- Message returned if the passwords don't match
    }

    // Check password length
    if (password.length < 6) {
        errors.push({
            msg: 'Password needs to be 6 or more characters in length'
        });
    }

    // If there are errors do the following
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation passes
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({
                        msg: 'Email is already taken '
                    });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash the password using bcrypt
                    bcrypt.genSalt(10, (error, salt) =>
                        bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if (error) throw error;
                            // Set the password to hashed
                            newUser.password = hash;
                            // Save the user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(error));
                        }));

                }
            });
    }

});

module.exports = router;