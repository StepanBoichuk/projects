const User = require('../models/users')

const getUsersList = async () => {
    const user = await User.find();
    const usersList = user.map((userData) => userData.username)
    return usersList;
}

module.exports = getUsersList;