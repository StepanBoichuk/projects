const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const getDatabase = require("./getDatabase");
const { v4: uuidv4 } = require('uuid');


async function signup (data) {
    const temp = await getDatabase();
    temp.push(data);
    const temp$ = fs.createWriteStream(path.join(__dirname, "..", "data", "userdata.json"), { encoding: "utf-8" });
    temp$.end(JSON.stringify(temp));
};

module.exports = signup;