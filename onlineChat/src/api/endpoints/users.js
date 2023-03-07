const { Router } = require('express');
const User = require('../../models/users');
const signup = require('./../../services/signup')
const signupValidation = require('./../../validation/signup.validation');

const usersAPI = Router();

usersAPI.get('/api/users', async (req, res) => {
    const users = await User.find({}, 'username email birth_date');
    res.send(users);
});

usersAPI.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, 'username email birth_date');
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    };
});

usersAPI.post('/api/users', signupValidation.apiValidator, async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user) {
            res.status(400).send(`${req.body.username} is already exist`);
        }else{
            await signup(req.body);
            res.send(req.body);
        }
    }catch (err) {
        res.status(400).send(err.message);
    };
});

usersAPI.put('/api/users/:id', async (req, res) => {
    const {body} = req;
    try {
        const isUser = await User.findOne({username: body.username});
        if (!isUser){
            await User.findByIdAndUpdate(req.params.id, {
                username: body.username,
                email: body.email,
                password: body.password,
                birth_date: body.birth_date
            });
            res.send(req.body);
        }else{
            res.status(400).send(`Username ${req.body.username} is already exist`);
        };
    }catch (err) {
        res.status(400).send(err.message);
    };
});

usersAPI.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send(user);
    }catch (err) {
        res.status(400).send(`User with ID ${req.params.id} is not exist`);
    };
});

module.exports = usersAPI;