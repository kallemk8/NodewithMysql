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
            res.send(result)
        }
    });
});
// Router.post('/', (req, res)=>{
//     const data = req.body;

//     connection.query("INSERT INTO comapny SET?",data, function(err, result){
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

module.exports = Router;