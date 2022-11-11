const express = require("express");
var nodemailer = require('nodemailer');
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json())
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sreekanth0598@gmail.com',
      pass: 'K@sreekanth8'
    }
  });

  var mailOptions = {
    from: 'sreekanth0598@gmail.com',
    to: 'kallemk8@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
Router.get('/', (req, res) =>{

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
})
module.exports = Router;