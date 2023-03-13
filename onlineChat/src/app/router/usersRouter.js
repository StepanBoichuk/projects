const { Router } = require('express');
const path = require('path');
const getUsersList = require('../../services/getUsersList');
const User = require('./../../models/users')

const usersRouter = Router();

usersRouter.get('/users', async (req, res) =>{
    const auth = req.user;
    const users = await getUsersList();
    if (!auth) {
        res.render(path.join(__dirname, '..', '..', 'views', 'pages', 'users'), {users, auth});
    } else {
        const userData = await User.findOne(auth);
        const username = userData.username;
        res.render(path.join(__dirname, '..', '..', 'views', 'pages', 'users'), {users, auth, username});
    }
});


module.exports = usersRouter;