const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact, 
} = require("../services/contact.service");


const schema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(15).pattern( /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).required(), 
});


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
            res.status(404).json({ message: 'Not Found' })
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const postContact = async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ message: `missing required field (${error.message})` })
            return;
        }
        // const postContact = req.body;
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
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ message: `missing fields (${error.message})` })
            return;
        }
        const { contactId } = req.params;
        // const putContact = req.body;    
        const contact = await updateContact(contactId, req.body);
        if (!contact) {
            res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const putchById = async (req, res, next) => { 
    try {
        const { favorite } = req.params;
        console.log(req.params)
        if (favorite === undefined) { 
            res.status(400).json({ message: "missing field favorite" })    
         }

    } catch (error) {
        next(error);
    }
 }

module.exports = { getContacts, getById, postContact, delContact, updateContactById, putchById };