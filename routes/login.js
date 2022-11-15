const express = require('express')
const Router = express.Router();
const connection = require('./../database')
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';
app.use(express.json())
Router.post('/', (req, res)=>{
    connection.query("SELECT * FROM user WHERE Email ='"+ req.body.username+"' and Password ='"+ req.body.password+"' ", function(err, result){
        if(err){
            throw err;
        }else{
            if(result.length !== 0){
                const accessToken = jwt.sign({ userId: result[0].ID }, JWT_SECRET, {
                    expiresIn: JWT_VALIDITY,
                  });
                var completed = {"status":true, "user":result[0], "code":200, "accessToken": accessToken}
                res.send(completed)
            }else{

                // const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
                //     expiresIn: JWT_VALIDITY,
                //   });
                // let jwtSecretKey = process.env.JWT_SECRET_KEY;
                // let data = {
                //     time: Date(),
                //     userId: 12,
                // }
                // const token = jwt.sign(data, jwtSecretKey);
                var noUser = {"status":false, "result":"No User founded in database", "code":200}
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