const { Contact, schemaCreate, schemaPatch, schemaUpdate } = require('./contacts');
const {  User, schemaRegister, schemaLogin, schemaSubscriptionValidate
} = require('./user');


module.exports = {
     User, schemaRegister, schemaLogin, schemaSubscriptionValidate, Contact, schemaCreate, schemaPatch, schemaUpdate
};