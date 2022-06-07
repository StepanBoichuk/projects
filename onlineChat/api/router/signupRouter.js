const { Router } = require("express");
const path = require("path");
const signup = require("../../services/signup");
const signupValidation = require('../../validation/signup.validation');

const authRouter = Router();

authRouter.get("/signup", (req, res) => {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"), { error: ''});
});

authRouter.post('/signup', signupValidation.appValidator, (req, res) => {
  const { error } = req.validation;
  if (error) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"), { error });
  } else {
    signup(req.body);
    req.session.auth = true;
    res.redirect("/");
  };
});

module.exports = authRouter;
