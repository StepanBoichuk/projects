const fs = require('fs');
const path = require('path');
const getDatabase = require('./getDatabase');

async function login(data) {
    const temp = await getDatabase();
    let userData = temp.find(user => user.username == data.username);
    if(userData && userData.password === data.password) {
        return { error: false, message: ""};
    }else{
        return { error: true, message: "Incorect username or password"};
    };
};

module.exports = login;