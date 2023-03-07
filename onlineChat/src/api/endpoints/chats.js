const { Router } = require('express');
const Chat = require('../../models/chats');

const chatsAPI = Router();

chatsAPI.post('/api/chats', async (req, res) => {
    const { body } = req;
    const chat = new Chat({
        usernameId_1: body.usernameId_1,
        usernameId_2: body.usernameId_2
    });
    await chat.save();
    res.send(body);
})

chatsAPI.get('/api/chats', async (req, res) => {
    const chats = await Chat.find({}, 'usernameId_1 usernameId_2');
    res.send(chats);
});

module.exports = chatsAPI;