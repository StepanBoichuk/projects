const { Router } = require('express');
const signup = require('./../../services/signup')
const signupValidation = require('./../../validation/signup.validation');

const signupAPI = Router();

signupAPI.post('/api/signup', signupValidation.apiValidator, async (req, res) => {
    try {
        await signup(req.body);
        res.send(req.body);
    }catch (err) {
        res.status(400).send(err.message);
    };
});


module.exports = signupAPI;