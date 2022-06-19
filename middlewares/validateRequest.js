const { createError } = require("../helpers/errors");

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {        
            next(createError(400, `missing field ${error.message}`));
        }
        next();
    }
};


module.exports = {
    validateRequest
};