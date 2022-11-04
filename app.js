const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeR = require('./routers/homeR')
const port = process.env.port || 8080;
const app = express();
const path = require('path')

//for database connection

mongoose.connect('mongodb://localhost:27017/project',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error connection");})
db.once('open',()=>{console.log("connection established");})

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
// app.set('view engine','ejs')
app.set("views", path.join(__dirname, "views"))



app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/',homeR)


app.listen(port)