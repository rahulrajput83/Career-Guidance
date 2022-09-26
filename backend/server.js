require('dotenv').config();
const express = require('express');
const AskQuestion = require('./Router/AskQuestion')
const mongoose = require('mongoose');
const Answers = require('./Router/Answer')
const CareerDetails = require('./Router/CareerDetail');
const Register = require('./Router/Register')
const Login = require('./Router/Login');
const VerifyAccount = require('./Router/VerifyAccount');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json({ limit: '50mb' }));

const DEFAULT_PORT = 2800;

const server = app.listen(process.env.PORT || DEFAULT_PORT, function() {
    const port = server.address().port;
    console.log(`Server listening on port ${port}!`);
})

mongoose.connect(process.env.connectionString)
    .then(() => {
        console.log('Connected to MongoDB.')
    })
    .catch(() => {
        console.log('Failed to connect to mongoDB.')
    })


app.use(function (req, res, next) {
    var allowedDomains = ['http://localhost:3000', 'https://career-guidance.vercel.app'];
    var origin = req.headers.origin;
    if (allowedDomains.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept');
    next();
});

app.use('/', AskQuestion);
app.use('/', Answers);
app.use('/', CareerDetails);
app.use('/', Register);
app.use('/', Login);
app.use('/', VerifyAccount);

app.get('/', function(req, res) {
    res.send('You are at Home')
});