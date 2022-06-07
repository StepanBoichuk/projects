const Joi = require("joi")
const {celebrate, Segments} = require('celebrate');
const userData = require('../services/userData')

const scheme = Joi.object({
          username: Joi.string().min(3).max(30).required(),
          email: Joi.string().min(3).max(30).email().required(),
          birth_date: Joi.string().required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .min(4)
            .max(30)
            .required(),
          repeat_password: Joi.ref("password")
        });



const apiValidator = celebrate({
    [Segments.BODY]: scheme
});

const appValidator = async (req, res, next) => {
    const { body } = req;
    const user = await userData(body);
    if (!user) {
    req.validation = scheme.validate(body);
    next();
    } else {
    req.validation = {error: 'Login is not alowed'}
    next();
    }

  };

module.exports = {
    scheme,
    apiValidator,
    appValidator
};