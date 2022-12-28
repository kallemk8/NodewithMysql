const express = require('express')
const Router = express.Router();
const connection = require('./../../database')
const app = express();
app.use(express.json());

Router.get('/:id', (req, res)=>{
    connection.query("select * from leaveassign where ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result[0]);
        }
    })
})

Router.get('/active/:id', (req, res)=>{
    connection.query("select * from leaveassign where status='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.get('/employeeLeaveTypes/:id', (req, res)=>{
    connection.query("select leaveassign.*, leavetype.LeaveNumber AS numbers, leavetype.name AS LeaveTypeName from leaveassign JOIN leavetype ON leavetype.ID=leaveassign.leaveType where userID='"+req.params.id+"' " , (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})
Router.get('/', (req, res)=>{
    
    connection.query("select leaveassign.*, user.Name, comapny.ComapnyName, leavetype.name from leaveassign JOIN user ON user.UserID=leaveassign.userID JOIN leavetype ON leavetype.ID=leaveassign.leaveType  JOIN comapny ON leaveassign.companyID=comapny.ComapnyID", (error, result, fields)=>{
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
    connection.query("INSERT INTO leaveassign SET leaveType='"+req.body.leaveType+"', userID='"+req.body.userID+"',CurrentDate='"+req.body.CurrentDate+"', companyID='"+req.body.CompanyID+"'", data, function(err, result){
        if(err){
            throw err;
        }else{
            res.send(result);
            
        }
    })
})

Router.put('/:id', (req, res)=>{
    connection.query("UPDATE leaveassign SET leaveType='"+req.body.leaveType+"', userID='"+req.body.userID+"' WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.put('/status/:id', (req, res)=>{
    const data = [req.body.status, req.params.id ];
    connection.query("UPDATE leaveassign SET status='"+req.body.status+"' WHERE ID='"+req.params.id+"'", (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

Router.delete('/:id', (req, res)=>{
    connection.query("DELETE FROM leaveassign WHERE ID="+req.params.id, (error, result, fields)=>{
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = Router;