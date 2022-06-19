const { isValidObjectId } = require('mongoose');

const validateId = (req, res, next) => {
    console.log(req.params);
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next({ status: 400, message: "Bad ID" })
    }
    next();
};

module.exports = {
    validateId
};
