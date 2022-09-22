const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    FullName: String,
    emailID: String,
    mobileNumber: Number,
    password: String,
    careerField: String,
});


const RegisterModel = mongoose.model('User', RegisterSchema);

module.exports = RegisterModel;