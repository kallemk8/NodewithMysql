const express = require('express')
const Router = express.Router();
const connection = require('./../../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from userroles where ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})

Router.get('/active/:id', (req, res)=>{
    connection.query("select * from userroles where status='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})
Router.get('/', (req, res)=>{
    connection.query("select userroles.*, user.Name, roles.role_name from userroles JOIN user ON user.UserID=userroles.userID JOIN roles ON roles.ID=userroles.roleID", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.post('/', (req, res)=>{
    const data = req.body;
    connection.query("INSERT INTO userroles SET?", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    connection.query("UPDATE userroles SET roleID='"+req.body.roleID+"', userID='"+req.body.userID+"'WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM userroles WHERE ID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;