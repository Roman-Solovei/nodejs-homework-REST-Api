const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, subscriptionUpdate } = require("../../controllers/controllersAuth");
const { schemaRegister, schemaLogin, schemaSubscriptionValidate } = require("../../models/user");
const { validateRequest } = require("../../middlewares/validateRequest");
const { auth } = require("../../middlewares/auth");
const controllUser = require('../../controllers/controllersUsers');


router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.get('/logout', auth, logoutUser);
router.get('/current', auth, controllUser.getUser);
router.patch('/', auth, validateRequest(schemaSubscriptionValidate), subscriptionUpdate);


module.exports = router;