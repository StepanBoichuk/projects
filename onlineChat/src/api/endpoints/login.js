const { Router } = require('express');
const loginValidation = require('./../../validation/login.validation');
const login = require('./../../services/login')

const loginAPI = Router();

loginAPI.post('/api/login', loginValidation.apiValidator, async (req, res) => {
    const { body } = req;
    const loginCheck = await login(body.username, body.password);
    if(loginCheck){
        if(user.verified == true){
            res.send(loginCheck._id);
        }else{
          res.send(`You need to verify your acount. Check your email ${user.email}`);
        };
    }else{
        res.status(400).send('Incorect username or password');
    };
});

module.exports = loginAPI;
