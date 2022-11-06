const express = require('express')
const http = require('http')
const path = require('path')
const app = express()

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

var conn = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b8ea8ff3653c7b',
  password: '6c6b9c93',
  database: 'heroku_b623dcfae74a5b4'
});

conn.connect(function(err){
  if(err) throw err
  console.log("Connected to database Ani")
  
})

app.post('/register', function(req, res){
  var username = req.body.reg_username
  var pwd = req.body.reg_password
  var query = "INSERT INTO user (userName, pwd) VALUES ('" + 
  username.toString() + "', '" + pwd.toString() + "'" + ");";
  
  conn.query(query, function(err, result){
    if(err) throw err;
    console.log(path.join('username: ', username.toString(), '  pwd: ', pwd.toString()))
    console.log("result: " + JSON.stringify(result))
  }) 
  console.log("registration complete")
  res.sendFile(registerUrl)
})

app.post('/login', function(req, res){
  var username = req.body.login_username
  var pwd = req.body.login_password
  var query = "SELECT pwd FROM user WHERE userName = '" + username.toString() + "';"
  console.log("start login")
  conn.query(query, function(err, result){
    if(err) throw err
    console.log("result: " + JSON.stringify(result))
    var retPwd = JSON.parse(JSON.stringify(result))
    if (retPwd[0].pwd == pwd){
      console.log("user " + username + " login successfully")
      res.sendFile(loginUrl)
    } else {
      console.log("wrong password: " + retPwd[0].pwd)
      res.end()
    }
  })
  
})

const homeUrl = path.join(__dirname, '/public/home.html')
app.get('/', function(req, res){
  res.sendFile(homeUrl)
})

const registerUrl = path.join(__dirname, '/public/register.html')
const loginUrl = path.join(__dirname, '/public/login.html')

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})