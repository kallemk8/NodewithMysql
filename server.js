const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database')
const singup = require('./routes/singup');
const logins = require('./routes/login');

app.use(bodyParser.json())
app.use('/login', logins);
app.use('/signup', singup);

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