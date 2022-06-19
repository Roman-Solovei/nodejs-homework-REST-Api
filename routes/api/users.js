const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, subscriptionUpdate } = require("../../controllers");
const { schemaRegister, schemaLogin, schemaSubscriptionValidate } = require("../../models");
const { validateRequest } = require("../../middlewares");
const { auth } = require("../../middlewares");
const controllUser = require('../../controllers');


router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.get('/logout', auth, logoutUser);
router.get('/current', auth, controllUser.getUser);
router.patch('/', auth, validateRequest(schemaSubscriptionValidate), subscriptionUpdate);


module.exports = router;