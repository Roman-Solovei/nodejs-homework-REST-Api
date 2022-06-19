const { schemaCreate, schemaPatch } = require('../models/contacts');
const { createError } = require('../helpers/errors')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact, 
} = require("../services/contact.service");


const getContacts = async (req, res, next) => {
    try {
        const allContacts = await listContacts(req.query);
        res.json(allContacts);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);        
        if (!contact) {
            throw createError(404, "Not Found")           
        };
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const postContact = async (req, res, next) => {
    try {
        const { error } = schemaCreate.validate(req.body);
        if (error) {           
            throw createError(400, `missing field ${error.message}`)            
        };      
        const contact = await addContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

const delContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await removeContact(contactId);
        if (!contact) {
            throw createError(404, "Not Found")            
        }
        res.status(200).json({ message: 'Contact deleted' });      
    } catch (error) {
        next(error);
    }
};

const updateContactById = async (req, res, next) => {
    try {
        const { error } = schemaCreate.validate(req.body);
        if (error) {
            throw createError(400, `missing fields (${error.message})`)         
        }
        const { contactId } = req.params;           
        const contact = await updateContact(contactId, req.body);
        if (!contact) {
           throw createError(404, "Not Found")  
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {    
    try {       
        const { favorite } = req.body;   
        const { error } = schemaPatch.validate(req.body);
        if (error) {
            throw createError(400, "Missing field favorite")            
        }       
        const { contactId } = req.params;           
        const contact = await updateContact(contactId, { favorite: `${favorite}` });    
        if (!contact) {
            throw createError(404, "Not Found") 
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
 }

module.exports = { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact };