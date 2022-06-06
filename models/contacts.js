const Joi = require('joi');
const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, min: 3, max: 25, required: [true, 'Set name for contact'], },
  email: { type: String, required: true },
  phone: { type: String, min: 5, max: 15, required: true },
  favorite: { type: Boolean, default: false }
});


const Contact = model('contact', schema);


const schemaCreate = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(15).pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).required(),
  favorite: Joi.bool(),
});


const schemaPatch = Joi.object({ 
  favorite: Joi.bool().required(),
});


module.exports = {
  Contact, schemaCreate, schemaPatch
};
