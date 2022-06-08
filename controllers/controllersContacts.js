const { schemaCreate, schemaPatch } = require('../models/contacts')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact, 
} = require("../services/contact.service");


const getContacts = async (req, res, next) => {
    try {
        const allContacts = await listContacts();
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
          return res.status(404).json({ message: 'Not Found' })
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
            res.status(400).json({ message: `missing required field (${error.message})` })
            return;
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
            res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json({ message: 'contact deleted' });
        console.log(res)
    } catch (error) {
        next(error);
    }
};

const updateContactById = async (req, res, next) => {
    try {
        const { error } = schemaCreate.validate(req.body);
        if (error) {
            res.status(400).json({ message: `missing fields (${error.message})` })
            return;
        }
        const { contactId } = req.params;           
        const contact = await updateContact(contactId, req.body);
        if (!contact) {
            res.status(404).json({ message: 'Not Found' });
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
            res.status(400).json({ message: "missing field favorite" })
            return;
        }       
        const { contactId } = req.params;           
        const contact = await updateContact(contactId, { favorite: `${favorite}` } );
        if (!contact) {
            res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
 }

module.exports = { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact };