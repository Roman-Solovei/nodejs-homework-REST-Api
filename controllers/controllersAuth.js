const authService  = require("../services/auth.service");

const registerUser = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);      
        res.status(201).json({
            message: 'Registration successful',
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            id: user._id,
        });
    } catch (error) {
        next(error)
    }
};


const loginUser = async (req, res, next) => {
    try {
        const token = await authService.loginUser(req.body);    
        res.status(200).json({
        status: 'success',        
        token,       
        user: {
            email: (req.body.email),
            subscription: "starter"
  }
  });
    } catch (error) {
        next(error);
    }
};


const logoutUser = async (req, res, next) => {
    try {
        await authService.logoutUser(req.user._id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};


const subscriptionUpdate = async (req, res, next) => {

    // const subscription = req.user.subscription;
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
    registerUser, loginUser, logoutUser, subscriptionUpdate
};