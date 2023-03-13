const User = require('../models/users')
const bcryptjs = require('bcryptjs');

const login = async (email, password) => {
    const user = await User.findOne({ email })
    if (user && await bcryptjs.compare(password, user.password)) {
        delete user.password;
        return user;
    } else {
        return void null;
    }
};

module.exports = login;