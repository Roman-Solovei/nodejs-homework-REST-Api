const authService = require("../services/auth.service");
const emailService  = require('../services/email.service');
const { createError } = require("../helpers/errors");
const userService = require("../services/user.service");



const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        
        await emailService.sendEmail(user.email, user.verificationToken);

        return res.status(201).json({
            code: 201,
            message: 'Registration successful',
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            id: user._id,
            avatarURL: user.avatarURL,
            verificationToken: user.verificationToken,
        });
    } catch (error) {
        next(error)
    }
};

const confirm = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userService.findUser({ verificationToken });
        
        if (!user) {
            throw createError(400, "Verification has already been passed");
        };     

        await userService.updateUser(user._id, { verify: true, verificationToken: null });      
        return res.status(200).json({
            code: 200,
            message: "Verification successful"            
        });
    } catch (e) {
        next(e);
    }
};

const resend = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.findUser({ email });
        if (!user) {
            throw createError(404, 'User not found');
        };
    
        await emailService.sendEmail(user.email, user.verificationToken);
        return res.status(200).json({
            code: 200,
            message: 'Verification email sent'
        });
    } catch (error) {
        next(error);
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
    register, login, logout, subscriptionUpdate, confirm, resend
};