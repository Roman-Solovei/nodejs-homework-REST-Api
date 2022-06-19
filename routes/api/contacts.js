const express = require('express');
const router = express.Router();
const { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact } = require('../../controllers/controllersContacts');
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateId } = require("../../middlewares/verifyId");
const { auth, author } = require("../../middlewares/auth");
const { schemaCreate, schemaPatch, schemaUpdate } = require("../../models/contacts");


router.get('/', auth, getContacts);

router.get('/:contactId', validateId, getById);

router.post('/', validateRequest(schemaCreate), auth, postContact);

router.put('/:contactId', validateId, auth, validateRequest(schemaUpdate), updateContactById);

router.patch('/:contactId/favorite', validateId, validateRequest(schemaPatch), updateStatusContact);

router.delete('/:contactId', validateId, auth, author('pro'), delContact);

module.exports = router;
