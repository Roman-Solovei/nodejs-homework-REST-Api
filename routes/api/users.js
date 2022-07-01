const express = require('express');
const router = express.Router();

const { register, login, logout, subscriptionUpdate, confirm, resend } = require("../../controllers");
const { schemaRegister, schemaLogin, schemaSubscriptionValidate, schemaVerifyResend } = require("../../models");
const { validateRequest } = require("../../middlewares");
const { auth, upload } = require("../../middlewares");
const controllUser = require('../../controllers');
const { uploadImage } = require('../../services/image.service');
const { updateUser } = require('../../services/user.service');

// router.use(auth);


router.post('/signup', validateRequest(schemaRegister), register);
router.post('/login', validateRequest(schemaLogin), login);
router.get('/logout', auth, logout);
router.get('/current', auth, controllUser.getUser);
router.patch('/', auth, validateRequest(schemaSubscriptionValidate), subscriptionUpdate);
router.patch('/avatars', auth, upload.single('avatar'), async (req, res, next) => {
    try {
        const { _id: id } = req.user;      
        const avatarURL = await uploadImage(id, req.file);
        console.log(avatarURL);
        await updateUser(id, { avatarURL });

        res.json({ avatarURL });
    } catch (error) {
        next(error);
    }
});
router.get('/verify/:verificationToken', confirm);
router.post('/verify', validateRequest(schemaVerifyResend), resend);


module.exports = router;