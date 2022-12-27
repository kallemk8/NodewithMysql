const express = require('express')
const Router = express.Router();
const connection = require('./../../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from leaves where ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})

Router.get('/active/:id', (req, res)=>{
    connection.query("select * from leaves where status='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.get('/employeeLeaveTypes/:id', (req, res)=>{
    connection.query("select leaves.*, leavetype.LeaveNumber AS numbers, leavetype.name AS LeaveTypeName from leaveassign JOIN leavetype ON leavetype.ID=leaveassign.leaveType where userID='"+req.params.id+"' " , (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})
Router.get('/', (req, res)=>{
   // connection.query("select * from leaves", (error, result, fields)=>{
    connection.query("select leaves.*, user.Name as EmpName, leavetype.name from leaves JOIN user ON user.UserID=leaves.userID JOIN leavetype ON leavetype.ID=leaves.leaveType", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            // result.map((item,i)=>{
            //     var newObject = [];
            //     var convertarray = item.leaveType.split(',');
            //     if(convertarray){
            //         convertarray.map((items,i)=>{
            //             connection.query("select name from leavetype where ID="+items, (error, results, fields)=>{
            //                 for (var i of results) {
            //                     newObject.push(i.name)
            //                 }
            //             })
            //             return items
            //         })
            //     }
            //     return item.leaveTypes = newObject
            // })
            res.send(result);
        }
    })
})

Router.post('/', (req, res)=>{
    const data = req.body;
    connection.query("INSERT INTO leaves SET?", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    const data = [req.body.name, req.body.sub_depat, req.body.desc, req.body.status, req.params.id ];
    connection.query("UPDATE leaves SET name='"+req.body.name+"', LeaveNumber='"+req.body.LeaveNumber+"', Applicable='"+req.body.Applicable+"', info='"+req.body.info+"'  WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.put('/status/:id', (req, res)=>{
    const data = [req.body.status, req.params.id ];
    connection.query("UPDATE leaves SET status='"+req.body.status+"' WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM leaves WHERE ID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;