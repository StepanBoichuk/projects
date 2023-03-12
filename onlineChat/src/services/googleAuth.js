const User = require('../models/users');

const googleAuth = async (profile) => {
    const email = profile.emails[0].value
    const user = await User.findOne({ email })
    if(!user) {
        const googleUser = new User({
            username: profile.name.givenName,
            email: profile.emails[0].value,
            verified: true
        });
    await googleUser.save();
    return {id:googleUser.id, username:googleUser.username, email:googleUser.email}
    }
}

module.exports = googleAuth;