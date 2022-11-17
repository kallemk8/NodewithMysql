const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from designation where ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})
Router.get('/', (req, res)=>{
    connection.query("select designation.*, departments.name from designation LEFT JOIN departments ON departments.ID=designation.department;", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.post('/', (req, res)=>{
    const data = req.body;
    connection.query("INSERT INTO designation SET?", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    const data = [req.body.designation, req.body.department, req.body.description, req.body.status, req.params.id ];
    connection.query("UPDATE designation SET designation=?, department=?, description=?, status=? where ID=?",data, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM designation WHERE ID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;