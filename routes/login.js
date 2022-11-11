const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json())

Router.post('/', (req, res)=>{

    connection.query("SELECT * FROM user WHERE Email ='"+ req.body.username+"' and Password ='"+ req.body.password+"' ", function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result[0])
        }
    });
});


module.exports = Router;