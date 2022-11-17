const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from departments where ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})

Router.get('/active', (req, res)=>{
    connection.query("select * from departments WHERE status=22", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send("hello");
        }
    })
})
Router.get('/', (req, res)=>{
    connection.query("select * from departments", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.post('/', (req, res)=>{
    const data = req.body;
    connection.query("INSERT INTO departments SET?", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    const data = [req.body.name, req.body.sub_depat, req.body.desc, req.body.status, req.params.id ];
    connection.query("UPDATE departments SET name='"+req.body.name+"', sub_depat='"+req.body.sub_depat+"', testing='"+req.body.desc+"', status='"+req.body.status+"' WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM departments WHERE ID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;