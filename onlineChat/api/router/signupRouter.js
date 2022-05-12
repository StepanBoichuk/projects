const { Router } = require("express");
const path = require("path");
const signup = require("../../services/signup");

const authRouter = Router();

authRouter.get("/signup", (req, res) => {
    res.render(path.join(__dirname, "..", "..", "views", "pages", "signup"));
});

authRouter.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username.trim(),
    email: req.body.email,
    birth_date: req.body.birth_date,
    password: req.body.password,
    repeat_password: req.body.repeat_password,
  };
  const result = await signup(data);
  if (result.error) {
    res.send(result.message);
  } else {
    req.session.auth = true;
    res.redirect("/");
  }
});

module.exports = authRouter;
