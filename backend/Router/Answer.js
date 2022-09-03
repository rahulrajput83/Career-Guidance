const express = require('express');
const router = express.Router();
const AnswerModel = require('../Schema/AnswerSchema')

router.get('/getanswer', (req, res) => {
    AnswerModel.find({})
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ value: 'Error' })
        })
})

router.post('/postanswer', (req, res) => {
    const NewAnswer = new AnswerModel({
        date: Date.now(),
        userId: req.body.userId,
        userName: req.body.userName,
        email: req.body.email,
        answer: req.body.answer,
        questionId: req.body.questionId,
    })
    NewAnswer.save()
        .then(() => {
            res.json({message: 'Saved'})
        })
        .catch(() => {
            res.json({message: 'Failed'})
        })
    
})

module.exports = router;