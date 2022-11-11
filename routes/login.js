const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())
Router.post('/', (req, res)=>{
    connection.query("SELECT * FROM user WHERE Email ='"+ req.body.username+"' and Password ='"+ req.body.password+"' ", function(err, result){
        if(err){
            throw err;
        }else{
            if(result.length !== 0){

                res.send(result[0])
            }else{
                // let jwtSecretKey = process.env.JWT_SECRET_KEY;
                // let data = {
                //     time: Date(),
                //     userId: 12,
                // }
                // const token = jwt.sign(data, jwtSecretKey);
                var noUser = {"status":200, "result":"No User founded in database"}
                res.send(noUser)
            }
        }
    });
});

Router.post('/test', (req, res)=>{
    connection.query("SELECT * FROM user WHERE Email ='"+ req.body.username+"' and Password ='"+ req.body.password+"' ", function(err, result){
        if(err){
            throw err;
        }else{
            if(result.length !== 0){

                res.send(result[0])
            }else{
                // let jwtSecretKey = process.env.JWT_SECRET_KEY;
                // let data = {
                //     time: Date(),
                //     userId: 12,
                // }
                // const token = jwt.sign(data, jwtSecretKey);
                var noUser = {"status":200, "result":"No User founded in database"}
                res.send(noUser)
            }
        }
    });
});


module.exports = Router;