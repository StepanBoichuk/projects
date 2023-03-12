const { Router } = require('express');
const passport = require('passport');

const oauthRouter = new Router();

oauthRouter.get('/redirect/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = oauthRouter;