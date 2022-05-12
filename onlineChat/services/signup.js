const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const getDatabase = require("./getDatabase");
const { v4: uuidv4 } = require('uuid');

async function signup(data) {
  const temp = await getDatabase();
  let i = temp.find((user) => user.username == data.username);
  if (!i) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).email().required(),
      birth_date: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(4)
        .max(30)
        .required(),
      repeat_password: Joi.ref("password"),
    });
    const { error } = schema.validate(data);
    if (error) {
      return { error: true, message: error.message };
    } else {
        let result = {
            id: uuidv4(),
            username: data.username,
            password: data.password,
            email: data.email,
            date: data.date 
        };
      temp.push(result);
      const file$ = fs.createWriteStream(
        path.join(__dirname, "..", "data", "userdata.json"),
        { encoding: "utf-8" }
      );
      file$.end(JSON.stringify(temp));
      return { error: false, message: "" };
    }
  } else {
    return { error: true, message: "Login not available" };
  }
}

module.exports = signup;
