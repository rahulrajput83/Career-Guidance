const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register')


router.post('/register', (req, res) => {
    RegisterModel.find({ emailID: req.body.email })
        .then((data) => {
            if(data.length >= 1) {
                res.json({message: 'User already registered.'})
            }
            else{
                const Register = new RegisterModel({
                    FullName: req.body.name,
                    emailID: req.body.email,
                    mobileNumber: req.body.mobile,
                    password: req.body.password,
                    careerField: '',
                })
                Register.save()
                    .then(() => {
                        res.json({ message: 'User successfully registered.' })
                    })
                    .catch(() => {
                        res.json({ message: 'err, please try again.' })
                    })
            }
        })
        .catch(err => {
            res.json({message: 'err, please try again.'})
        })

})

module.exports = router;