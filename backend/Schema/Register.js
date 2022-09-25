const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    FullName: String,
    emailID: String,
    mobileNumber: Number,
    password: String,
    careerField: String,
    Verified: Boolean
});


const RegisterModel = mongoose.model('User', RegisterSchema);

module.exports = RegisterModel;