const Joi = require('joi')
const {celebrate, Segments} = require('celebrate');

const scheme = Joi.object({
          username: Joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          email: Joi.string().min(3).max(30).email().required(),
          birth_date: Joi.string().required(),
          password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(4)
            .max(30)
            .required(),
          repeat_password: Joi.ref('password')
        });


const apiValidator = celebrate({
  [Segments.BODY]: scheme
});

const appValidator = async (req, res, next) => {
    const { body } = req;
    req.validation = scheme.validate(body);
    next();
  };

module.exports = {
    scheme,
    apiValidator,
    appValidator
};