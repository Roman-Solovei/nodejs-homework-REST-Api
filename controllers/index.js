const { register, login, logout, subscriptionUpdate, confirm, resend } = require('./controllersAuth');
const { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact } = require('./controllersContacts');
const { getUser } = require('./controllersUsers');

module.exports = { 
    register, login, logout, subscriptionUpdate, getContacts, getById, postContact, delContact, updateContactById, updateStatusContact, getUser, confirm, resend,
 };