/* Imports */
const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register');


/* Update Career Field */
router.post('/verifyAccount', (req, res) => {
    RegisterModel.findOne({ _id: req.body.id })
        .then((value) => {
            if (value.Verified === true) {
                res.json({ message: 'Already Verified' })
            }
            else {
                RegisterModel.updateOne({ _id: req.body.id }, { $set: { Verified: true } })
                    .then(res.json({ message: 'Successfully Verified' }))
                    .catch(res.json({ message: 'Error, Please try again...' }));
            }
        })
        .catch(() => {
            res.json({ message: 'Error, Please try again...' })
        })
})

/* Exports router */
module.exports = router;