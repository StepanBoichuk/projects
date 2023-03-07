const { Router } = require('express');
const path = require('path');
const getUsersList = require('../../services/getUsersList');
const User = require('./../../models/users')

const usersRouter = Router();

usersRouter.get('/users', async (req, res) =>{
    const { auth } = req.session;
    const users = await getUsersList();
    if (!auth) {
        res.render(path.join(__dirname, '..', '..', 'views', 'pages', 'users'), {users, auth});
    } else {
        const userData = await User.findById(auth);
        const username = userData.username;
        res.render(path.join(__dirname, '..', '..', 'views', 'pages', 'users'), {users, auth, username});
    }
});

module.exports = usersRouter;