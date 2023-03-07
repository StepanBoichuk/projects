const passport = require('passport');
const LocalStrategy = require('passport-local');
const login = require('./login.js');


const local = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await login(username, password);
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password'});
        }
        return cb(null, user);
    } catch(e){
        cb(e);
    }
});

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user._id, email: user.email });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});


module.exports = {
    local
}