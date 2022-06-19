const { registerUser, loginUser, logoutUser, subscriptionUpdate } = require('./controllersAuth');
const { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact } = require('./controllersContacts');
const { getUser } = require('./controllersUsers');

module.exports = { 
    registerUser, loginUser, logoutUser, subscriptionUpdate, getContacts, getById, postContact, delContact, updateContactById, updateStatusContact, getUser,
 };