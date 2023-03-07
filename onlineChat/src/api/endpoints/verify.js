const { Router } = require('express');
const User = require('../../models/users')

const verifyAPI = Router();

verifyAPI.get('/api/verify/:id', async (req, res) => {
    try {
        const user = await User.findOne({verifyingKey: req.params.id});
        if (user) {
            if(user.verified == true){
                res.send(`${user.username} is already verified`);
            }else{
                user.verified = true;
                await user.save();
                res.send(`${user.username} succesfull verifyed`);
            };
        };
        } catch (e) {
            res.status(400).send('Incorrect verifyng key')
        };
    
});

module.exports = verifyAPI;