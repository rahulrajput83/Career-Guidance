const mongoose = require('mongoose');

const CareerGuidanceSchema = new mongoose.Schema({
    CareerPath: String,
    Department: String,
    Description: String,
    HighSchool: String,
    Inter: String,
    UG: String,
    PG: String,
    Skills: String,
    Exams: String
});


const CareerDetailsModel = mongoose.model('CareerDetails', CareerGuidanceSchema);

module.exports = CareerDetailsModel;