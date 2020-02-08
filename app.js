// Require necessary dependencies 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initialize express
const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to keys file in the config folder
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser middleware
app.use(express.urlencoded({
    extended: false
}));

// Express Session
app.use(session({
    secret: 'secret time',
    resave: true,
    saveUninitialized: true
}));

// Passport middlware (sessions)
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Variables for using flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));