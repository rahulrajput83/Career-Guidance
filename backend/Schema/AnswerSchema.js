const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    date: Number,
    userId: String,
    userName: String,
    email: String,
    answer: String,
    questionId: String,
});

const AnswerModel = mongoose.model('Answers', AnswerSchema);

module.exports = AnswerModel;