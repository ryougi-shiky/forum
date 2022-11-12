const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const app = express()

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

const homeUrl = path.join(__dirname, 'public/home.html');
app.get('/', function(req, res){
  res.sendFile(homeUrl)
})

const login_register = require('./route/home.js');
app.use('/', login_register);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})