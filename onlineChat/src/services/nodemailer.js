const nodemailer = require('nodemailer');
const config = require("config");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'OnlineChat-nodejs@outlook.com',
        pass: '1234567890qwe'
    }
});


const sendVerificationMail = (user) => {
    const options = {
        from: 'OnlineChat-nodejs@outlook.com',
        to: user.email,
        subject: 'Verification email',
        text: `Hello, ${user.username}, please verificate your email adress by clicking on this link: http://${config.get('server.host')}:${config.get('server.port')}/api/verify/${user.verifyingKey}`
    };
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err)
            return;
        }
    });
};

module.exports = sendVerificationMail;