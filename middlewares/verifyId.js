const { isValidOjectId } = require('mongoose');

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidOjectId(id)) {
        next({ status: 400, message: "Bad ID" })
    }
    next();
};

module.exports = {
    validateId
};
