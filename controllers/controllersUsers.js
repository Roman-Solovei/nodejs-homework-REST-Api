const getUser = async (req, res, next) => {
    try {
        const user = req.user;
         res.status(201).json({ 
       user: {
             email: user.email,
             subscription: user.subscription
          }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser
}