/*
* npm i express
* */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors')

/*-------------------------------*/
const userRoute =require('./routes/UserRoute');
const {config} = require("dotenv");
/*-------------------------------*/
const serverPort = process.env.SERVER_PORT;

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/gota',()=>{
    app.listen(serverPort,()=>{
        console.log(`#GoHomeGota server is up & Running on => ${serverPort}`)
    });
})


/*-------------------------------*/
app.use('/api/v1/user', userRoute);
/*-------------------------------*/

