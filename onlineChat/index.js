const express = require("express");
const config = require("config");
const signupRouter = require("./api/router/signupRouter");
const usersRouter = require("./api/router/usersRouter");
const loginRouter = require("./api/router/loginRouter");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');


const app = express();

app.set("view engine", "ejs");
app.set('trust proxy', 1);

app.use(session({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: true,
}));


app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join("public", "assets")));

app.use("/", signupRouter, loginRouter, usersRouter);

app.use("/", (req, res) => {
  res.redirect("/users");
});

app.use('/logout', (req, res) => {
    res.session.destroy();
    res.redirect('/');
});

app.listen(config.get("server.port"), () => {
  console.log(
    `Server is running on http://localhost:${config.get("server.port")}`
  );
});
