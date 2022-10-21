const express = require('express')
const path = require('path')
const app = express()
const port = 3000

var mysql      = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'ani',
  password: 'password',
  database: 'Ani'
});


var userID = 1;
app.post('/register', function(req, res){
  var username = req.body.reg_username
  var pwd = req.body.reg_password
  userID = userID+1
  var query = "INSERT INTO user (userName, pwd) VALUES ('" + 
  username.toString() + "', '" + pwd.toString() + "'" + ");";
  conn.connect(function(err){
    if(err) throw err
    console.log("Connected to database Ani")
    conn.query(query, function(err, result){
      if(err) throw err;
      console.log(path.join('username: ', username.toString(), '  pwd: ', pwd.toString()))
    }) 
  })
  console.log("registration complete")
})

const homeUrl = path.join(__dirname, '/public/home.html')
app.get('/', (req, res) => {
  res.sendFile(homeUrl)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})