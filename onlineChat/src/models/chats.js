const {Schema, model, SchemaTypes} = require('mongoose');

const ChatSchema = new Schema({
    usernameId_1: String,
    usernameId_2: String,
    chatMessage: [{
        username: String,
        message: String,
        messageTime: Date
    }]
});

const Chat = model('Chat', ChatSchema, 'chats');

module.exports = Chat;