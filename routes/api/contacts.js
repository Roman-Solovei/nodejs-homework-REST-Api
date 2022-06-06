const express = require('express');
const router = express.Router();
const { getContacts, getById, postContact, delContact, updateContactById, putchById } = require('../../controllers/controllersContacts')



router.get('/', getContacts);

router.get('/:contactId', getById);

router.post('/', postContact);

router.delete('/:contactId', delContact);

router.put('/:contactId', updateContactById);

router.patch('/:contactId/favorite', putchById);

module.exports = router;
