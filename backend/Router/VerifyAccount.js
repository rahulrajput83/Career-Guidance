/* Imports */
const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register');



/* Update Career Field */
router.patch('/verify', (req, res) => {
    RegisterModel.find({ _id: req.body.userId })
        .then((value) => {
            if (value[0].Verified === true) {
                res.json({ message: 'Already Verified' })
            }
            else {
                RegisterModel.updateOne({ _id: req.body.userId }, { $set: { Verified: true } })
                    .then(() => {
                        res.json({ message: 'Successfully Verified' })
                    })

                    .catch(() => {
                        res.json({ message: 'Error, Please try again...' })
                    });
            }
        })
        .catch(() => {
            res.json({ message: 'Error, Please try again...' })
        })
})

/* Exports router */
module.exports = router;