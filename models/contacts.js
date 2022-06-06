
const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, min: 3, max: 25, required: [true, 'Set name for contact'], },
  email: { type: String, required: true },
  phone: { type: String, min: 5, max: 15, required: true },
  favorite: { type: Boolean, default: false }
});

const Contact = model('contact', schema);


module.exports = { 
  Contact
}
