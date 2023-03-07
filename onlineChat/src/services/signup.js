const User = require('../models/users')
const bcryptjs = require('bcryptjs');
const sendVerificationMail = require('./nodemailer');

const signup = async (data) => {
    const user = new User({
        username: data.username,
        email: data.email,
        birth_date: data.birth_date,
        password: await bcryptjs.hash(data.password, 10)
    });
    await user.save();
    sendVerificationMail(user);
}

module.exports = signup;