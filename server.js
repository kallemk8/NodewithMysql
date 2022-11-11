const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const connection = require('./database')
const singup = require('./routes/singup');
const logins = require('./routes/login');
const email = require('./routes/email');
const department = require('./routes/department');
app.use(bodyParser.json())
app.use('/login', logins);
app.use('/signup', singup);
app.use('/department', department);

app.get('/', (req, res) =>{
    connection.query("select * from user", (error, result, fields)=>{
    if(error){
        res.send(error);
    }else{
        res.send(result);
    }
    })
})
app.listen(3002)