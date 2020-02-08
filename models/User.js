// Require in necessary dependencies
const mongoose = require('mongoose');

// Create the schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: True
    },
    email: {
        type: String,
        required: True
    },
    password: {
        type: String,
        required: True
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Setting up the model
const User = mongoose.model('User', UserSchema);
// Create a module.exports for portability between files
module.exports = User; 