const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')
const http = require("http");
const path = require("path");
const fs = require("fs");

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const connection = require('./database')
const singup = require('./routes/singup');
const logins = require('./routes/login');
const email = require('./routes/email');
const department = require('./routes/department');
const designation = require('./routes/designation');
const projects = require('./routes/projects');
const meetings = require('./routes/meetings');
const tasks = require('./routes/tasks');
const user = require('./routes/user');
const dailyTasks = require('./routes/dailyTasks');
const leavetype = require('./routes/leaveManagement/leaveType');
const leaveAssign = require('./routes/leaveManagement/leaveAssign');
const leaves = require('./routes/leaveManagement/leaves');
const userroles = require('./routes/settings/userRoles');
const employee = require('./routes/employee/employee');
const upload = require('./routes/settings/upload');
app.use(cors())
app.use(bodyParser.json())
app.use('/login', logins);
app.use('/signup', singup);
app.use('/department', department);
app.use('/designation', designation);
app.use('/users', user);
app.use('/projects', projects);
app.use('/meetings', meetings);
app.use('/tasks', tasks);
app.use('/dailytasks', dailyTasks);
app.use('/leavetype', leavetype);
app.use('/leaveassign', leaveAssign);
app.use('/leaves', leaves);
app.use('/userroles', userroles);
app.use('/employee', employee);
app.use('/upload', upload);
app.options('*', cors());
app.use("/uploads", express.static("public/uploads"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/roles', (req, res) =>{
    connection.query("select * from roles", (error, result, fields)=>{
    if(error){
        res.send(error);
    }else{
        res.send(result);
    }
    })
})
app.listen(5000)