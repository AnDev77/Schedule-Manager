
const dotenv = require('dotenv')
dotenv.config();
const nodemailer = require('nodemailer');
const sender= process.env.SENDER;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    user: sender,
    pass: pass
  }
});

module.exports = {transporter};