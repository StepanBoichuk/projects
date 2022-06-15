const { Router } = require("express");
const path = require("path");
const loginValidation = require('../../validation/login.validation');

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
  const { auth } = req.session;
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { auth, error: '' });
});

loginRouter.post("/login", loginValidation.appValidator, (req, res) => {
  const { error } = req.validation;
  if(error) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { error });
  }else{
    req.session.auth = true;
    res.redirect("/");
  };
});

module.exports = loginRouter;
