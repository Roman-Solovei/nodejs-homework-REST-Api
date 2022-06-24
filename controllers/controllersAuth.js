const authService  = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);      
        return res.status(201).json({
            code: 201,
            message: 'Registration successful',
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            id: user._id,
            avatarURL: user.avatarURL,
        });
    } catch (error) {
        next(error)
    }
};


const login = async (req, res, next) => {
    try {
        const { token, subscription } = await authService.loginUser(req.body);  
        return res.status(200).json({
        code: 200,
            data: {
                status: 'Success',
                token,
                user: {
                    email: (req.body.email),
                    subscription: subscription,
                }
            }
  });
    } catch (error) {
        next(error);
    }
};


const logout = async (req, res, next) => {
    try {
        await authService.logoutUser(req.user._id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};


const subscriptionUpdate = async (req, res, next) => {

    const id = req.user._id;

    try {
        const updateSubscription = await authService.subscriptionUpdate(id, req.body)
        res.status(200).json({
            email: updateSubscription.email,
            subscription: updateSubscription.subscription,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register, login, logout, subscriptionUpdate
};