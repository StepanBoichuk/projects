const express = require("express");
const config = require("config");
const signupRouter = require("./src/app/router/signupRouter");
const usersRouter = require("./src/app/router/usersRouter");
const loginRouter = require("./src/app/router/loginRouter");
const oauthRouter = require('./src/services/oauth2');
const usersAPI = require('./src/api/endpoints/users');
const loginAPI = require('./src/api/endpoints/login');
const signupAPI = require('./src/api/endpoints/signup');
const chatsAPI = require('./src/api/endpoints/chats');
const verifyAPI = require('./src/api/endpoints/verify')
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const { createClient } = require('redis');
const passport = require('passport');
const { errors } = require('celebrate');


const { passportStrategies } = require('./src/services')

  const app = express();

  passport.use(passportStrategies.local);
  passport.use(passportStrategies.google);

  app.locals = {
    error: '',
    message: ''
  };

  app.set("view engine", "ejs");
  app.set("trust proxy", 1);

  app.use(session({
    secret: config.get("sessionSecret"),
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.authenticate('session'));

  const redisConnect = async () => {
    const client = createClient({
      url: 'redis://redis:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
  };

  redisConnect();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  app.use("/assets", express.static(path.join("public", "assets")));

  app.use("/", signupRouter, loginRouter, usersRouter, oauthRouter);
  app.use("/", usersAPI, loginAPI, signupAPI, chatsAPI, verifyAPI);

  app.get("/", (req, res) => {
    res.redirect("/users");
  });

  app.use("/logout", (req, res) => {
      req.session.destroy();
      res.redirect('/users')
      
  });

  app.use(errors())
  app.use((req, res, next) => {
    res.locals = {
      auth: !!req.user
    };
    next()
  });

  mongoose.connect(config.get("db.connectionString")).then(() => {
    app.listen(config.get("server.port"), () => {
      console.log(
        `Server is running on http://localhost:${config.get("server.port")}`
      );
    });  
  });