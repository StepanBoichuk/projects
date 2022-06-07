const { Router } = require('express');
const path = require('path');
const getDatabase = require('../../services/getDatabase')

const usersRouter = Router();

async function userList() {
    const users = await getDatabase()
    return users.map(user => user.username)
} 

usersRouter.get('/users', async (req, res) =>{
    const { auth } = req.session;
    const result = await userList();
    res.render(path.join(__dirname, '..', '..', 'views', 'pages', 'users'), {users: result, auth});
});

module.exports = usersRouter;