const { Router } = require("express");
const path = require("path");
const signup = require("../../services/signup");
const signupValidation = require('../../validation/signup.validation');

const authRouter = Router();

authRouter.get("/signup", (req, res) => {
  const auth  = req.user;
  if (!auth) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"), { error: ''});
  } else {
    res.redirect('/users');
  };
});

authRouter.post('/signup', signupValidation.appValidator, async (req, res) => {
  const { error } = req.validation;
  if (error) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"), { error });
  } else {
    try {
      await signup(req.body);
      res.redirect('/');
    }catch (e) {
      if(e.code == '11000') {
        const error = `Email ${req.body.email} is already exist`
        res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"), {error})
      }
    };
  };
});

module.exports = authRouter;
