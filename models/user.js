const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const User = model('user', schema);


const schemaRegister = Joi.object(
    {
        password: Joi.string().required(),
        email: Joi.string().pattern(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).required(),
        subscription: Joi.string(),
    }
);


const schemaLogin = Joi.object({
    email: Joi.string().pattern(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).required(),
    password: Joi.string().required(),
});


const schemaSubscriptionValidate = Joi.object({
    subscription: Joi.string()
    .required(),
});

module.exports = {
    User, schemaRegister, schemaLogin, schemaSubscriptionValidate
}