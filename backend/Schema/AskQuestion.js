const mongoose = require('mongoose');

const AskQuestionSchema = new mongoose.Schema({
    date: Number,
    userId: String,
    userName: String,
    email: String,
    question: String
});


const AskQuestionModel = mongoose.model('Questions', AskQuestionSchema);

module.exports = AskQuestionModel;