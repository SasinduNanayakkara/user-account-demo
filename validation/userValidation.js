const joi = require("joi");

//registration validation
const registerValidation = (data) => {
    const schemaValidation = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required().email(),
        username: joi.string().required(),
        password: joi.string().required(),
    });

    return schemaValidation.validate(data);
}

//login validation
const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
    });

    return schemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation; //export functions
module.exports.lologinValidation =loginValidation;