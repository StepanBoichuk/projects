const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oidc');
const login = require('./login.js');
const config = require('config')
const googleAuth = require('./googleAuth')


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

const google = new GoogleStrategy({
    clientID: config.get('auth.google.clientID'),
    clientSecret: config.get('auth.google.secret'),
    callbackURL: config.get('auth.google.callbackURL'),
    scope: ['profile']
}, async (issuer, profile, cb) => {
    try {
        const user = await googleAuth(profile)
        if (!user) {
            cb(null, false, { message: 'This email is already registred'});
        } else {
            cb(null, user);
        };
    }catch(e){
        cb(e)
    }
});

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user._id, email: user.email});
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});


module.exports = {
    local,
    google
}