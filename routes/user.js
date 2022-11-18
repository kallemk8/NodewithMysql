const express = require('express');
const md5 = require('md5');
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from user where UserID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})
Router.get('/', (req, res)=>{
    connection.query("select * from user", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})
Router.get('/companyID/:id', (req, res)=>{
    connection.query("select * from user where CompanyID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.post('/', (req, res)=>{
    var data = req.body;
    data.password = md5(req.body.password)
    connection.query("INSERT INTO user SET?", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    const data = req.body;
    connection.query("UPDATE user SET? where UserID='"+req.params.id+"'",data, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM user WHERE UserID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;