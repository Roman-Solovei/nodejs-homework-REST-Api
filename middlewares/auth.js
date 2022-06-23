const { authenticateUser } = require("../services/auth.service");
const { createError } = require("../helpers/errors");



const auth = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");   

    if (bearer !== 'Bearer' || !token) {
        next(createError(401, "Unauthorized"));
    };

    const user = await authenticateUser(token);
    if (!user) {
       next(createError(401, "Unauthorized"));
    };

    req.user = user;
    next();
};

const author = (subscription) => {
    return (req, res, next) => {
        if (req.user.subscription !== subscription) {
            next(createError(401, "User rights limit"))
        }
        next();
    }
};


module.exports = {
    auth, author
};