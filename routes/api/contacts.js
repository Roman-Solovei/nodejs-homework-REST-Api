const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
} = require("../../models/contacts");


const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).required(), 
});



router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
    // console.log('Get all contacts')
  } catch (error) {
    next(error);
  } 
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.json({ message: '404 Not Found' })
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.json({ message: '400 Bad Request' })
      return;
    }
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }


  // res.json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
