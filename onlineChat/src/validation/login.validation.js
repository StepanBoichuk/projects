const Joi = require('joi');
const {celebrate, Segments} = require('celebrate');

const scheme = Joi.object({
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(4)
    .max(30)
    .required()
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