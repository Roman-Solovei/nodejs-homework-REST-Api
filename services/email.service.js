const { PORT } = require('../helpers/env');
const BASE_URL = `http://localhost:${PORT}/api/v1`;


const nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");


const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    defaultProvider,
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: { ses, aws },
});


const sendEmail   = async (userEmail, code) => {
    const link = `${BASE_URL}/users/verify/${code}`    
    try {
        await transporter.sendMail(
            {
                to: userEmail,
                from: 'romario2409@gmail.com', // can be stored in envs
                subject: 'Confirm your email',
                html: `<h4>Click on this link to confirm registration ${link}</h4>`,
            }
        );

    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    sendEmail  
};