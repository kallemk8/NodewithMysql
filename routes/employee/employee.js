const express = require('express')
const Router = express.Router();
const connection = require('./../../database')
const app = express();
app.use(express.json());
const md5 = require('md5')
Router.get('/:id', (req, res)=>{
    connection.query("select empdetails.*, user.*, departments.name AS Depart_name, designation.designation AS Designation_name from empdetails JOIN user ON user.UserID=empdetails.UserID JOIN departments ON departments.ID=empdetails.Department JOIN designation ON designation.ID=empdetails.Designation where empdetails.ID='"+req.params.id+"'", (error, result, fields)=>{
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
    
    connection.query("select empdetails.*, user.*, departments.name AS Depart_name, designation.designation AS Designation_name from empdetails JOIN user ON user.UserID=empdetails.UserID JOIN departments ON departments.ID=empdetails.Department JOIN designation ON designation.ID=empdetails.Designation", (error, result, fields)=>{
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
    var data = req.body;
    var userList = {
        "Name":req.body.Name,
        "lastname":req.body.lastname,
        "Mobile":req.body.Mobile,
        "Email":req.body.Email,
        "Password":md5(req.body.Password),
        "CompanyID":req.body.CompanyID,
        "Singin":false,
        "status":2
    }
    connection.query("INSERT INTO user SET?", userList, function(err, result){
        if(err){
            throw err;
        }else{
            var empdetails = {
                "UserID":result.insertId,
                "EmpID":req.body.EmpID,
                "DateOfJoining":req.body.DateOfJoining,
                "Department":req.body.Department,
                "Designation":req.body.Designation
            }
            connection.query("INSERT INTO empdetails SET?", empdetails, function(err, result){
                if(err){
                    throw err;
                }else{
                    var completed = {"status":true, "employee":result, "code":200}
                    res.send(completed);
                    
                }
            })
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


Router.put('/updateProfileInfo/:id', (req, res)=>{
    connection.query("UPDATE empdetails, user SET empdetails.Address='"+req.body.Address+"',empdetails.Reporting='"+req.body.Reporting+"',empdetails.Department='"+req.body.Department+"',empdetails.Designation='"+req.body.Designation+"',empdetails.pincode='"+req.body.pincode+"',empdetails.state='"+req.body.state+"',empdetails.country='"+req.body.country+"',empdetails.profileImage='"+req.body.profileImage+"', user.lastname ='"+req.body.lastname+"', user.Name ='"+req.body.Name+"', user.Mobile ='"+req.body.Mobile+"', user.Gender ='"+req.body.Gender+"', user.dob ='"+req.body.dob+"' WHERE empdetails.ID='"+req.params.id+"' and user.UserID='"+req.body.UserID+"'", (error, result, fields)=>{
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