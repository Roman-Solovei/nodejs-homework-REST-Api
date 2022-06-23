const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, subscriptionUpdate } = require("../../controllers");
const { schemaRegister, schemaLogin, schemaSubscriptionValidate } = require("../../models");
const { validateRequest } = require("../../middlewares");
const { auth, upload } = require("../../middlewares");
const controllUser = require('../../controllers');
const { uploadImage } = require('../../services/image.service');
const { updateUser } = require('../../services/user.service');

// router.use(auth);

router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.get('/logout', auth, logoutUser);
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


module.exports = router;