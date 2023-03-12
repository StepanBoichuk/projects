const { Router } = require('express');
const path = require('path');
const loginValidation = require('../../validation/login.validation');
const User = require('./../../models/users')
const login = require('./../../services/login');
const passport = require('passport');


const loginRouter = Router();

loginRouter.get("/login", async (req, res) => {
  const auth  = req.user;
  if (!auth) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { auth});
  } else {
    res.redirect('/users');
  };
});

loginRouter.post("/login", loginValidation.appValidator, async (req, res, next) => {
  const { error } = req.validation;
  if(error) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { error });
  }else{
    const { email } = req.body;
    req.body.username = email;

    passport.authenticate('local', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
    }
    )(req, res, next);
  };
});

module.exports = loginRouter;
