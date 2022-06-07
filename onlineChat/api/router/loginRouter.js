const { Router } = require("express");
const path = require("path");
const login = require("../../services/login");



const loginRouter = Router();


loginRouter.get("/login", (req, res) => {
  const { auth } = req.session;
    res.render(path.join(__dirname, "..", "..", "views", "pages", "login"), { auth });
});

loginRouter.post("/login", async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  const result = await login(userData);
  if (result.error) {
    res.send(result.message);
  } else {
    req.session.auth = true;
    res.redirect("/");
  }
});

module.exports = loginRouter;
