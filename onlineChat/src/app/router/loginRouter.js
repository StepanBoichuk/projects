const { Router } = require('express');
const path = require('path');
const loginValidation = require('../../validation/login.validation');
const User = require('./../../models/users')
const login = require('./../../services/login');
const passport = require('passport');


const loginRouter = Router();

loginRouter.get("/login", async (req, res) => {
  const { auth } = req.session;
  if (!auth) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { auth});
  } else {
    res.redirect('/users');
  };
});

loginRouter.post("/login", loginValidation.appValidator, async (req, res, next) => {
  const { body } = req;
  const { error } = req.validation;
  if(error) {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { error });
  }else{
    // try {
    //   const loginCheck = await login(body.username, body.password);
    //   const user = await User.findOne({username: body.username})
    //   if(loginCheck) {
    //     if(user.verified == true){
    //       req.session.auth = user._id;
    //       res.redirect('/users');
    //     }else{
    //       res.send(`You need to verify your acount. Check your email ${user.email}`);
    //     };
    //   }else{
    //     res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { error: "Incorect login or password" });
    //   };
    // }catch (e){
    //   console.error(e)
    // };
    const { email } = req.body;
    req.body.username = email;
    passport.authenticate('local',{failureMessage: true}, (err, user, message) => {
      if (user) {
        res.redirect('/');
      } else {
        res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { message });
        console.log(message)
      }
    }
    )(req, res, next);
  };
});

module.exports = loginRouter;
