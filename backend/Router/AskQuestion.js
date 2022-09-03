const express = require('express');
const router = express.Router();
const AskQuestionModel = require('../Schema/AskQuestion')


router.get('/getask', (req, res) => {
    AskQuestionModel.find({})
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ value: 'Error' })
        })
})

router.post('/postask', (req, res) => {
    const NewQuestion = new AskQuestionModel({
        date: Date.now(),
        userId: req.body.userId,
        userName: req.body.userName,
        email: req.body.email,
        question: req.body.question
    })
    NewQuestion.save()
        .then(() => {
            res.json({message: 'Saved'})
        })
        .catch(() => {
            res.json({message: 'Failed'})
        })
    
})

module.exports = router;