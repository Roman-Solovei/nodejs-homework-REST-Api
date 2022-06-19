const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../helpers/errors");
const { User } = require("../models");

const { SECRET_KEY } = require('../helpers/env');



const registerUser = async (userData) => {
   
    const result = await User.findOne({email: userData.email});
  
    if (result) {
        throw createError(409, "Email in use");
    };

    const password = userData.password;
    const hashedPass = await bcrypt.hash(password, 10);

    return User.create({
        ...userData,
        password: hashedPass,
    });
};


const loginUser = async ({ email, password }) => {
    const user = await User.findOne({email: email});
    
    if (!user) {
        throw createError(400, `User ${email} not found`);
    };

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw createError(400, "Enter valid password");
    };

    const payload = {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
    };    

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });   
    await User.findByIdAndUpdate(user._id, { token });

    return {
        token
    };
};


const logoutUser = async (id) => {
    const user = await User.findOne({ _id: id });      

    if (!user) { 
         throw createError(401, "Not authorized");
    } 
        
    await User.findByIdAndUpdate(id, { token: null });
};


const authenticateUser = async (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const { id } = payload;
        const user = await User.findById(id);        

        return user.token !== token ? null : user;
    } catch (e) {
        return null;
    }
};


const subscriptionUpdate = async (id, subscription) => { 
    return await User.findByIdAndUpdate(id, subscription, { new: true });
}


module.exports = {
    authenticateUser, loginUser, logoutUser, registerUser, subscriptionUpdate,
};

