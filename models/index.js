const { Contact, schemaCreate, schemaPatch, schemaUpdate } = require('./contacts');
const {  User, schemaRegister, schemaLogin, schemaSubscriptionValidate, schemaVerifyResend
} = require('./user');


module.exports = {
     User, schemaRegister, schemaLogin, schemaSubscriptionValidate, Contact, schemaCreate, schemaPatch, schemaUpdate, schemaVerifyResend
};