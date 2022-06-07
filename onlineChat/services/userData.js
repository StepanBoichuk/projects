const getDatabase = require('./getDatabase');

const userData = async (data) => {
    const temp = await getDatabase();
    let user = temp.find((user) => user.username === data.username);
    return user;
};

module.exports = userData;