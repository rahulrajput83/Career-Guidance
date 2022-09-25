/* Imports */
const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register');
const AnswerModel = require('../Schema/AnswerSchema')

/* Login Route */
router.post('/login', (req, res) => {
    /* Find MongoDb documents with req.body.email. */
    RegisterModel.find({ emailID: req.body.email })
        .then((data) => {
            /* If data.length greater than 1. */
            if (data.length >= 1) {
                /* If dsata[0].password === req.body.password */
                if (data[0].password === req.body.password) {
                    if (data[0].Verified === true) {
                        /* send response back with message and data. */
                        res.json({ message: 'Successfully Login', data: data });
                    }
                    else {
                        /* Else send response with message. */
                        res.json({ message: 'Email not verified !!', })
                    }
                }
                else {
                    /* Else send response with message. */
                    res.json({ message: 'Wrong password !!', })
                }
            }
            else {
                /* Else send response with message. */
                res.json({ message: 'User not registered.' })
            }
        })
        .catch(err => {
            /* Else send response with message. */
            res.json({ message: 'err, please try again.' })
        })
})


/* Delete Account Route */
router.delete('/delete-account', (req, res) => {
    RegisterModel.findOne({ _id: req.body.id })
        .then((data) => {
            console.log(data);
        })
});

/* Update Career Field */
router.patch('/careerfield', (req, res) => {
    RegisterModel.updateOne({ _id: req.body.id }, { $set: { 'careerField': req.body.careerField } })
        .then(res.json({ message: 'Updated...' }))
        .catch(res.json({ message: 'Error, Please try again...' }));
})


/* Exports router */
module.exports = router;