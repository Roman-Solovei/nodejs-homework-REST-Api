const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");


const schema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(15).pattern( /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).required(), 
});



router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);   
  } catch (error) {
    next(error);
  } 
});

router.get('/:contactId', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);      
    if (error) {
      res.status(400).json({ message: `missing required field (${error.message})` })
      return;
    }
    const { name, email, phone } = req.body;    
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }  
});

router.delete('/:contactId', async (req, res, next) => {
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
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);   
    if (error) {
      res.status(400).json({ message: `missing fields (${error.message})` })
      return;
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await updateContact(contactId, name, email, phone);
    if (!contact) { 
       res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }   
});

module.exports = router
