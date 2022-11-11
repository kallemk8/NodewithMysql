const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
app.use(express.json())
Router.post('/', (req, res)=>{
    //const data = req.body;
    var comapnyList = {
        "ComapnyName":req.body.ComapnyName,
        "BrandName":req.body.BrandName,
        "Website":req.body.Website,
        "Domain":req.body.Domain,
        "CompanySize":req.body.CompanySize,
        "Modules":req.body.Modules,
        "Role":req.body.Role
    }
    
    connection.query("INSERT INTO comapny SET?",comapnyList, function(err, result){
        if(err){
            throw err;
        }else{
            var userList = {
                "Name":req.body.Name,
                "Mobile":req.body.Mobile,
                "Email":req.body.Email,
                "Gender":req.body.Gender,
                "Password":req.body.Password,
                "CompanyID":result.insertId
            }
            connection.query("INSERT INTO user SET?", userList, function(err, result){
                if(err){
                    throw err;
                }else{
                    res.send(result);
                    
                }
            })
        }
    });
    
})

// Router.post('/', (req, res)=>{
    
//     connection.query("INSERT INTO comapny (ComapnyName, BrandName, Website, Domain, CompanySize, Modules, Role) VALUES ?", [[
//         ["Naveen", "1234567891", "vitelglobal.com", "Male", "34", "2","99"]
//     ]], function(err, result){
//         if(err){
//             throw err;
//         }else{
//             connection.query("INSERT INTO user (Name, Mobile, Email, Gender, Password, CompanyID) VALUES ?", [[
//                 ["Naveen", "1234567891", "naveen.g@vitelglobal.com", "Male", "naveen1234", result.insertId]
//             ]], function(err, result){
//                 if(err){
//                     throw err;
//                 }else{
//                     res.send(result);
                    
//                 }
//             })
//         }
//     });
    
// })

//sample json in post man

// {
//     "ComapnyName":"Suresh",
//     "BrandName":"Suresh123",
//     "Website":"suresh.com",
//     "Domain":"www.suresh.com",
//     "CompanySize":"12",
//     "Modules":"2",
//     "Role":"Admin",
//     "Name":"Suresh",
//     "Mobile":"1234567890",
//     "Email":"suresh@gmail.com",
//     "Gender":"Male",
//     "Password":"suresh123"
// }

module.exports = Router;