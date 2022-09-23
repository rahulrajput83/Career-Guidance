const express = require('express');
const router = express.Router();
const RegisterModel = require('../Schema/Register')


router.post('/login', (req, res) => {
    RegisterModel.find({ emailID: req.body.email })
        .then((data) => {
            if(data.length >= 1) {
                if(data[0].password === req.body.password) {
                    res.json({message : 'Successfully Login', data: data});
                }
                else{
                    res.json({message: 'Wrong password !!',})
                }
            }
            else{
                res.json({message: 'User not registered.'})
            }
        })
        .catch(err => {
            res.json({message: 'err, please try again.'})
        })

})

module.exports = router;