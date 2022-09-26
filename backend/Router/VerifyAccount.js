/* Imports */
const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register');
const cors = require('cors');


/* Update Career Field */
router.post('/verifyAccount', cors(), (req, res) => {
    RegisterModel.find({ _id: req.body.id, emailID: req.body.email })
        .then((value) => {
            if (value[0].Verified === true) {
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