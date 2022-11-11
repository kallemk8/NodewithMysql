const express = require("express");
const app = express();
app.use(express.json())
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
Router.post("/", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});

module.exports = Router;