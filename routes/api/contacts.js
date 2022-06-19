const express = require('express');
const router = express.Router();
const { getContacts, getById, postContact, delContact, updateContactById, updateStatusContact } = require('../../controllers');
const { validateRequest } = require("../../middlewares");
const { validateId } = require("../../middlewares");
const { auth, author } = require("../../middlewares");
const { schemaCreate, schemaPatch, schemaUpdate } = require("../../models");


router.get('/', auth, getContacts);

router.get('/:contactId', validateId, getById);

router.post('/', validateRequest(schemaCreate), auth, postContact);

router.put('/:contactId', validateId, auth, validateRequest(schemaUpdate), updateContactById);

router.patch('/:contactId/favorite', validateId, validateRequest(schemaPatch), updateStatusContact);

router.delete('/:contactId', validateId, auth, author('pro'), delContact);

module.exports = router;
